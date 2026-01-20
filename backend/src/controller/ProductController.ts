import type {Request , Response} from "express"
import {ProductService} from "../service/ProductService.js";
import {ProductRequestSchema} from "../dto/request/ProductRequest.js";
import {BaseResponse} from "../dto/response/BaseResponse.js";
import {ResponseStatus} from "../dto/response/enum/ResponseStatus.js";

const productService = new ProductService(); 

export async function getProducts(req : Request, res : Response){
    const id : string = res.locals.userId;
    const products = await productService.getProducts(id);
    return BaseResponse.send(res , ResponseStatus.OK , null , products);
}

export async function getMyProducts(req : Request , res : Response){
    const id : string = res.locals.userId;
    const products = await productService.getMyProducts(id);
    return BaseResponse.send(res , ResponseStatus.OK , null , products);
}

export async function getProduct(req : Request , res : Response){
    const id = req.params.id;
    const userId = res.locals.userId;
    if(!id){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "id cannot be a null value" , null);
    }
    const product = await productService.getProduct(id , userId);
    return BaseResponse.send(res ,ResponseStatus.OK , null  , product);
}


export async function createProduct(req : Request , res : Response){
    console.log("in controller")
    
    const result = await ProductRequestSchema.safeParseAsync(req.body);
    const ownerId : string = res.locals.userId;
    if(!result.success){
        let error = JSON.parse(result.error.message)
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , error[0].message , null);
    }
    const image = req.file;
    if (!image) {
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product image cannot be null" , null);
    }

    await productService.createProduct(result.data , ownerId , image);
    return BaseResponse.send(res , ResponseStatus.OK , "product created", null)
}


export async function removeProduct(req : Request , res : Response){
    const productId = req.params.id;
    const userId = res.locals.userId;
    if(!productId){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product id cannot be null" , null);
    }
    await productService.removeProduct(productId , userId);
    return BaseResponse.send(res , ResponseStatus.OK , "product is successfully removed" , null );
}


export async function updateProduct(req : Request , res : Response){
    const productId = req.params.id;
    if(!productId){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product id cannot be null" , null);
    }
    const result = await ProductRequestSchema.safeParseAsync(req.body);
    const ownerId = res.locals.userId;
    const image = req.file;
    console.log(req.file);

    if(!image){
        return BaseResponse.send(res, ResponseStatus.BAD_REQUEST , "product image cannot be null", null);
    }

    if(!result.success){
        let error = JSON.parse(result.error.message)
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , error[0].message , null);
    }
    await productService.updateProduct(result.data , image , ownerId , productId);
    return BaseResponse.send(res , ResponseStatus.OK , "product updated." , null);
}


export async function likeProduct(req : Request , res : Response){
    const productId = req.params.id;
    const userId = res.locals.userId;
    if(!productId){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product not found" , null);
    } 
    await productService.likeProduct(productId , userId);
    return BaseResponse.send(res , ResponseStatus.OK , "Success" , null);
}