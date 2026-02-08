import type {Request , Response} from "express";
import { BaseResponse } from "../../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../../dto/response/enum/ResponseStatus.js";
import { Chat } from "../../../../models/Chat/Chat.js";


export async function findChatMessages(req : Request , res : Response){
    try{
        
        const userId = res.locals.userId;
        const chatId = req.params.id;
        console.log("chat messages getting for : " + chatId);
        if(!chatId){
            return BaseResponse.send(res, ResponseStatus.BAD_REQUEST , "chad id cannot be null" , null);
        }
        const messages = await Chat.findChatMessagesByUserId(userId , chatId);
        return BaseResponse.send(res, ResponseStatus.OK , null , messages);
    }catch(err){
        console.log("err" + err);
        return BaseResponse.send(res , ResponseStatus.INTERNAL_SERVER_ERROR , "INTERNAL SERVER ERROR" , null);
    }
}