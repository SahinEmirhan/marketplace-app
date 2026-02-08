import { Schema , model , Model } from "mongoose";
import { ProductResponse } from "../../dto/response/ProductResponse.js";
import type { ProductRequest } from "../../dto/request/ProductRequest.js";
import { deleteImage } from "../../s3/deleteImage.js";
import { getSignedImageUrl } from "../../s3/getSignedImageUrl.js";
import { saveImage } from "../../s3/saveImage.js";
import { productsToProductResponseList } from "./functions/productsToProductResponseList.js";

const MAX_DATABASE_ARRAY_FIELD_LENGTH = 1e4;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const MAX_PRICE = 999_999_999;

export interface IProduct{
    id : string | null,
    name : string,
    description : string,
    price : number,
    imageKey : string,
    owner : string,
    likes : string[]
}

const ProductSchema = new Schema<IProduct>(
    {
        name : {required : true , type : String , maxLength : MAX_DATABASE_TEXT_FIELD_LENGTH},
        description : {required : true , type : String , maxLength : MAX_DATABASE_TEXT_FIELD_LENGTH},
        price : {required : true , type : Number, max : MAX_PRICE},
        imageKey : {required : true , type : String},
        owner : {required : true , type : String},
        likes : {required : false , type : [String] , maxLength : MAX_DATABASE_ARRAY_FIELD_LENGTH}
    },
    {
        timestamps : true
    }
)

export interface IProductModel extends Model<IProduct>{
    findProductsNotOwnedByOwnerId(ownerId : string) : Promise<IProduct[]>;
    findProductsOwnedByOwnerId(ownerId : string) : Promise<IProduct[]>;
    findProductById(id : string) : Promise<IProduct>;
    createProduct(product : ProductRequest , ownerId : string , image : Express.Multer.File) : Promise<void>;
    deleteProductById(productId : string , userId : string) : Promise<void>;
    updateProduct(product : ProductRequest , image : Express.Multer.File, ownerId : string , productId : string) : Promise<void>;
    likeProduct(productId : string, userId : string) : Promise<void>;
}

export const Product = model<IProduct , IProductModel>("Product" , ProductSchema);

ProductSchema.statics.findProductsNotOwnedByOwnerId = async function(ownerId : string) : Promise<ProductResponse[]>{
    const products = await this.find({owner : {$ne : ownerId}}); 
    if(!products || products.length == 0){
        return [];
    }

    return productsToProductResponseList(products);  
}

ProductSchema.statics.findProductsOwnedByOwnerId = async function(ownerId : string) : Promise<ProductResponse[]>{
    const products = await this.find({owner : ownerId});
    if(!products || products.length == 0 ){
        return [];
    }

    return productsToProductResponseList(products);  
}

ProductSchema.statics.findProductById = async function(id : string) : Promise<ProductResponse>{
        const productDoc = await this.findOne({_id : id});
        if(!productDoc){
            throw new Error("Product not found.")
        }
        const signedImageUrl = await getSignedImageUrl(productDoc.imageKey);
        return new ProductResponse(productDoc._id.toString() , productDoc.name , productDoc.description , productDoc.price , signedImageUrl).setIsLiked(productDoc.likes.includes(id));
}

ProductSchema.statics.createProduct = async function(product : ProductRequest , ownerId : string , image : Express.Multer.File) : Promise<void>{
    if(!product){
        throw new Error("Invalid product data.");
    }
    const imageKey = await saveImage(image.buffer , image.mimetype);
    
    const productDoc = new Product({name : product.name, description : product.description, price : product.price, imageKey : imageKey, owner : ownerId});
    await productDoc.save();
}

ProductSchema.statics.deleteProductById = async function(productId : string , userId : string) : Promise<void>{
    const productDoc = await this.findOne({_id : productId});
    if(userId != productDoc.getOwner()){
        throw new Error("User does not own the product")
    }
    await deleteImage(productDoc.getImageKey());
    await this.deleteOne({_id : productId});
}

ProductSchema.statics.updateProduct = async function(product : ProductRequest , image : Express.Multer.File, ownerId : string , productId : string) : Promise<void>{
    const productDoc = await this.findOne({_id : productId, owner : ownerId});
    if(!productDoc){
        throw new Error("Product not found or user does not own the product")
    }
    await deleteImage(productDoc.getImageKey());
    const imageKey = await saveImage(image.buffer , image.mimetype);
    productDoc.setName(product.name).setDescription(product.description).setPrice(product.price).setImageKey(imageKey);
    await this.updateOne( {_id : productDoc.getId()}, productDoc);
}


ProductSchema.statics.likeProduct = async function(productId : string, userId : string) : Promise<void>{
    const productDoc = await this.findOne({_id : productId});
    if(!productDoc){
        throw new Error("Product not found");
    }
    let likes : string[] = productDoc.getLikes();
    if(likes.includes(userId)){
        likes = likes.filter((id) => id !== userId);
    }
    else{
        likes.push(userId);
    }
    productDoc.setLikes(likes);
    await this.updateOne( {_id : productDoc.getId()}, productDoc);
}

