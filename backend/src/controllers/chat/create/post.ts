import type {Request , Response} from "express";
import { BaseResponse } from "../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../dto/response/enum/ResponseStatus.js";
import { Chat } from "../../../models/Chat/Chat.js";


export async function createChatRoom(req : Request , res : Response){
    try {
        const productId = req.params.id as string;
        const userId = res.locals.userId;
        if(!productId){
            return BaseResponse.send(res , ResponseStatus.BAD_REQUEST, "product id cannot be null" , null );
        }       
        const chatRes = await Chat.findOrCreateChat(productId , userId);
        return BaseResponse.send(res , ResponseStatus.OK , "Chat room created" , chatRes);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Chat room creation failed";
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , errorMessage , null);
    }
}