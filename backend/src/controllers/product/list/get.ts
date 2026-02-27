import type {Request , Response } from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function findProductsNotOwnedByOwnerId(req : Request, res : Response){
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const id : string = res.locals.userId;
    const products = await Product.findProductsNotOwnedByOwnerId(id, page, size);
    return BaseResponse.send(res , ResponseStatus.OK , null , products);
}