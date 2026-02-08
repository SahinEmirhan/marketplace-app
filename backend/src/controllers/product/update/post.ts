import type { Request , Response } from "express";
import { ProductRequestSchema } from "../../../dto/request/ProductRequest.js";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

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
    await Product.updateProduct(result.data, image , ownerId , productId);
    return BaseResponse.send(res , ResponseStatus.OK , "product updated." , null);
}