import type{Request , Response} from "express"
import { BaseResponse } from "../dto/response/BaseResponse.js";
import { ResponseStatus } from "../dto/response/enum/ResponseStatus.js";
import { ChatService } from "../service/ChatService.js";

const chatService = new ChatService();

export async function createChatRoom(req : Request , res : Response){
    const productId = req.params.id as string;
    const userId = res.locals.userId;
    if(!productId){
        BaseResponse.send(res , ResponseStatus.BAD_REQUEST, "product id cannot be null" , null );
    }       
     return await chatService.createChatRoom(productId , userId);
}