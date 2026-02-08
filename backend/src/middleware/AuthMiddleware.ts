import type {NextFunction, Request , Response} from "express"
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";
import { BaseResponse } from "../dto/response/BaseResponse.js";

export function authMiddleware(req : Request, res : Response , next : NextFunction){
    if(!req.session.user){
        return BaseResponse.send(res , ResponseStatus.UNAUTHORIZED , "Unauthorized" , null);
    }

    next();
}