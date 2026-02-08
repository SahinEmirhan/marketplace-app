import type { Request , Response } from "express";
import { ProductRequestSchema } from "../../../dto/request/ProductRequest.js";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function createProduct(req : Request , res : Response){
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

    await Product.createProduct(result.data , ownerId , image);
    return BaseResponse.send(res , ResponseStatus.OK , "product created", null)
}