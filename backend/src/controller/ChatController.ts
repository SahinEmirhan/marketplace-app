import type{Request , Response} from "express"
import { ChatService } from "../service/ChatService.js";
import { BaseResponse } from "../dto/response/BaseResponse.js";
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";

const chatService = new ChatService();

export async function createChatRoom(req : Request , res : Response){
    try {
        const productId = req.params.id as string;
        const userId = res.locals.userId;
        if(!productId){
            return BaseResponse.send(res , ResponseStatus.BAD_REQUEST, "product id cannot be null" , null );
        }       
        const chatRes = await chatService.createChatRoom(productId , userId);
        return BaseResponse.send(res , ResponseStatus.OK , "Chat room created" , chatRes);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Chat room creation failed";
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , errorMessage , null);
    }
}


export async function getMyChats(req : Request , res : Response){
    try{
        const userId = res.locals.userId;
        const chats = await chatService.getMyChats(userId);
        return BaseResponse.send(res , ResponseStatus.OK , null , chats);
    }catch(err){
        return BaseResponse.send(res , ResponseStatus.BAD_REQUEST , "BAD REQUEST", null);
    }
}


export async function getChatMessages(req : Request , res : Response){
    try{
        
        const userId = res.locals.userId;
        const chatId = req.params.id;
        console.log("chat messages getting for : " + chatId);
        if(!chatId){
            return BaseResponse.send(res, ResponseStatus.BAD_REQUEST , "chad id cannot be null" , null);
        }
        const messages = await chatService.getChatMessages(userId , chatId);
        return BaseResponse.send(res, ResponseStatus.OK , null , messages);
    }catch(err){
        console.log("err" + err);
        return BaseResponse.send(res , ResponseStatus.INTERNAL_SERVER_ERROR , "INTERNAL SERVER ERROR" , null);
    }
}