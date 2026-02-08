import type { Request , Response } from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function likeProduct(req : Request , res : Response){
    const productId = req.params.id;
    const userId = res.locals.userId;
    if(!productId){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product not found" , null);
    } 
    await Product.likeProduct(productId , userId);
    return BaseResponse.send(res , ResponseStatus.OK , "Success" , null);
}