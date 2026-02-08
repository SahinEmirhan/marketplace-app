import type {Request, Response} from "express";
import {AuthRequestSchema} from "../../../dto/request/AuthRequest.js";
import {BaseResponse} from "../../../dto/response/BaseResponse.js";
import {ResponseStatus} from "../../../dto/response/enum/ResponseStatus.js";
import { User } from "../../../models/User/User.js";

export async function login(req : Request, res : Response){
    const result = AuthRequestSchema.safeParse(req.body);
    
    if(!result.success){
        let error = JSON.parse(result.error.message)
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , error[0].message , null);
    }

    const user = await User.findUserByEmailAndVerifyPassword(result.data.email , result.data.password);
    if(!user){
        return BaseResponse.send(res , ResponseStatus.UNAUTHORIZED , "Wrong email or password" , null);
    }

    // Create session
    req.session.user = {id : user.id as string, email : user.email};
    return BaseResponse.send(res , ResponseStatus.OK , "Successfully Logged In" , null)
} 