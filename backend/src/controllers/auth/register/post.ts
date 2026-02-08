import type {Request, Response} from "express";
import {AuthRequestSchema} from "../../../dto/request/AuthRequest.js";
import {BaseResponse} from "../../../dto/response/BaseResponse.js";
import {ResponseStatus} from "../../../dto/response/enum/ResponseStatus.js";
import {User} from "../../../models/User/User.js";


export async function register(req : Request, res : Response){
    const result = AuthRequestSchema.safeParse(req.body);
    if(!result.success){
        let error = JSON.parse(result.error.message)
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , error[0].message , null);
    }

    const isUserExist = await User.isUserExist(result.data.email);
    if(isUserExist){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "User already exists" , null);
    }
    await User.createUser({
        id : null,
        email : result.data.email,
        password : result.data.password,
        products : []
    });
    return BaseResponse.send(res , ResponseStatus.OK , "User Registered" , null);
}   