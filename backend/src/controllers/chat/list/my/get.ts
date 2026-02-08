import type {Request , Response} from "express";
import { BaseResponse } from "../../../../dto/response/BaseResponse.js";
import { ResponseStatus } from "../../../../dto/response/enum/ResponseStatus.js";
import { Chat } from "../../../../models/Chat/Chat.js";

export async function findMyChats(req : Request , res : Response){
    try{
        const userId = res.locals.userId;
        const chats = await Chat.findChatsByUserId(userId);
        return BaseResponse.send(res , ResponseStatus.OK , null , chats);
    }catch(err){
        return BaseResponse.send(res , ResponseStatus.INTERNAL_SERVER_ERROR , "Internal server error", null);
    }
}