import type {Request , Response } from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function findProduct(req : Request , res : Response){
    const id = req.params.id;
    const userId = res.locals.userId;
    if(!id){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "id cannot be a null value" , null);
    }
    const product = await Product.findProductById(id);
    if(product.owner !== userId){
        return BaseResponse.send(res , ResponseStatus.FORBIDDEN , "you are not authorized to access this product" , null);
    }
    return BaseResponse.send(res ,ResponseStatus.OK , null  , product);
}