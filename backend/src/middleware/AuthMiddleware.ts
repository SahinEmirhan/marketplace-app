import type {NextFunction, Request , Response} from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";
import { BaseResponse } from "../dto/response/BaseResponse.js";

export function authMiddleware(req : Request, res : Response , next : NextFunction){
    const token = req.cookies?.token;
    
    if(!token){
        return BaseResponse.send(res , ResponseStatus.UNAUTHORIZED , "Unauthorized" , null);
    }

    try{
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const payload = jwt.verify(token, ACCESS_SECRET as string) as JwtPayload;
        
        res.locals.userId = payload.userId;
        next();

    }catch(err){
        return BaseResponse.send(res , ResponseStatus.UNAUTHORIZED , "Token expired or invalid" , null)
    }


}