import type { Request , Response } from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function deleteProduct(req : Request , res : Response){
    const productId = req.params.id;
    const userId = res.locals.userId;
    if(!productId){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "product id cannot be null" , null);
    }
    await Product.deleteProductById(productId , userId);
    return BaseResponse.send(res , ResponseStatus.OK , "product is successfully removed" , null );
}