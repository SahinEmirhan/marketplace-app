import type { Socket } from "socket.io";
import { ChatRepository } from "../repository/ChatRepository.js";
import { MessageRepository } from "../repository/MessageRepository.js";
import { Message } from "../entity/Message.js";
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();

export function registerChatHandlers(io : any , socket : Socket){
    socket.on("join_chat" , async (chatId : string) => {
        const userId = socket.data.userId;
        const chat = await chatRepository.findChat(chatId);
        if(chat.getOwnerId() != userId || chat.getLikerId() != userId){
            throw new Error("Unauthorized to connect chat room");
        }
        socket.join(`chat:${chatId}`)
    })


    socket.on("send_message" , async (chatId : string , content : string) => {
        const userId = socket.data.userId;
        const chat = await chatRepository.findChat(chatId);
        if(chat.getOwnerId() != userId || chat.getLikerId() != userId){
            throw new Error("Unauthorized to connect chat room");
        }
        let senderType = "liker";
        if(userId == chat.getOwnerId()){
            senderType = "owner";
        }
        const message = new Message(chatId, userId , content)
        const createdMessage = await messageRepository.createMessage(message);
        io.to(`chat:${chat.getId()}`).emit("receive_message" , {content : createdMessage.getContent() , senderType : senderType});
    })

    
}