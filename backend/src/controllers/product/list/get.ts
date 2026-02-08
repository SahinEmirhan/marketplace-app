import type {Request , Response } from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import {Product} from "../../../models/Product/Product.js";

export async function findProductsNotOwnedByOwnerId(req : Request, res : Response){
    const id : string = res.locals.userId;
    const products = await Product.findProductsNotOwnedByOwnerId(id);
    return BaseResponse.send(res , ResponseStatus.OK , null , products);
}