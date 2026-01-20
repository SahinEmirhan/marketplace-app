import { ProductRepository } from "../repository/ProductRepository.js";
import Product from "../entity/Product.js";
import type { ProductRequest } from "../dto/request/ProductRequest.js";
import { ProductResponse } from "../dto/response/ProductResponse.js";
import {saveImageToS3 , getSignedImageUrlFromS3 , deleteImageFromS3} from "../aws/s3.js";

export class ProductService{

    private readonly productRepository = new ProductRepository();

    async getProducts(userId : string){
        const products = await this.productRepository.getProductsNotOwnedBy(userId);
        return await this.productsToProductResponseList(products)
    }

    async getMyProducts(userId : string){
        const products = await this.productRepository.getMyProducts(userId);
        return await this.productsToProductResponseList(products);
    }

    async getProduct(productId : string , userId : string){
        const product = await this.productRepository.getProduct(productId);
        const signedImageUrl = await getSignedImageUrlFromS3(product.getImageKey());
        const productRes = new ProductResponse(product.getId() , product.getName() , product.getDescription() , product.getPrice() , signedImageUrl).setIsLiked(product.getLikes().includes(userId));
        return productRes;
    }


    private async productsToProductResponseList(products : Product[]){
        let productResList : ProductResponse[] = [];
        for(let product of products){
            const signedImageUrl =  await getSignedImageUrlFromS3(product.getImageKey())
            productResList.push(new ProductResponse(product.getId() , product.getName() , product.getDescription() , product.getPrice() , signedImageUrl))
        }
        return productResList;
    }

    async createProduct(product : ProductRequest , ownerId : string , image : Express.Multer.File){
        const imageKey = await saveImageToS3(image.buffer , image.mimetype);
        const newProduct = new Product(product.name , product.description , product.price , imageKey,  ownerId);
        await this.productRepository.createProduct(newProduct);
    }

    async removeProduct(productId : string , userId : string){
        const product = await this.productRepository.getProduct(productId);
        if(userId != product.getOwner()){
            throw new Error("User does not own the product")
        }
        await deleteImageFromS3(product.getImageKey());
        await this.productRepository.removeProduct(productId);
    }

    async updateProduct(product : ProductRequest , image : Express.Multer.File, ownerId : string , productId : string){
        let dbProduct : Product;
        dbProduct = await this.productRepository.getProduct(productId);   
        if(dbProduct.getOwner() != ownerId){
            throw new Error("User does not own the product")
        }
        const deletedImage = await deleteImageFromS3(dbProduct.getImageKey());
        console.log(deletedImage);
        const imageKey = await saveImageToS3(image.buffer , image.mimetype);
        dbProduct.setName(product.name).setDescription(product.description).setPrice(product.price).setImageKey(imageKey);
        await this.productRepository.updateProduct(dbProduct);
    }

    async likeProduct(productId : string, userId : string){
        let dbProduct = await this.productRepository.getProduct(productId);
        if(dbProduct.getLikes().includes(userId)){
            dbProduct = dbProduct.removeLike(userId);
        }
        else{
            dbProduct = dbProduct.addLike(userId);
        }
        await this.productRepository.updateProduct(dbProduct);
    }
}