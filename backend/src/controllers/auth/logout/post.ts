import type {Request, Response} from "express";
import {BaseResponse} from "../../../dto/response/BaseResponse.js";
import {ResponseStatus} from "../../../dto/response/enum/ResponseStatus.js";

export async function logout(req : Request, res : Response){
    req.session.destroy((err) => {
        if(err){
            return BaseResponse.send(res , ResponseStatus.INTERNAL_SERVER_ERROR , "Failed to logout" , null);
        }
        res.clearCookie('connect.sid');
        return BaseResponse.send(res , ResponseStatus.OK , "Successfully Logged Out" , null);
    });
}