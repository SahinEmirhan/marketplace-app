import Product from "../entity/Product.js"
import { ProductMapper } from "./mapper/ProductMapper.js";
import { ProductModel } from "./schema/ProductSchema.js";
export class ProductRepository{
    async getProductsNotOwnedBy(ownerId : string){
        const products = await ProductModel.find({owner : {$ne : ownerId}}); 
        if(!products || products.length == 0){
            return [];
        }

        return products.map(product => ProductMapper.toDomain(product));
    }

    async getMyProducts(ownerId : string){
        const products = await ProductModel.find({owner : ownerId});
        if(!products || products.length == 0 ){
            return [];
        }

        return await products.map(product => ProductMapper.toDomain(product));
    }

    async getProduct(id : string){
        const product = await ProductModel.findOne({_id : id});
        if(!product){
            throw new Error("Product not found.")
        }
        return ProductMapper.toDomain(product);
    }

    async createProduct(product : Product){
        await ProductModel.create(ProductMapper.toPersistance(product));
    }

    async removeProduct(id : string){
        await ProductModel.deleteOne({_id : id});
    }

    async updateProduct(product : Product){
        await ProductModel.updateOne( {_id : product.getId()}, ProductMapper.toPersistance(product));
    }

}