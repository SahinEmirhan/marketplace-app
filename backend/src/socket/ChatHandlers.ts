import {ChatRepository} from "../repository/ChatRepository.js";
import {MessageRepository} from "../repository/MessageRepository.js";
import {Message} from "../entity/Message.js";
import type {Socket} from "socket.io";

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();

export function registerChatHandlers(io : any , socket : Socket){
    socket.removeAllListeners("send_message");
    socket.removeAllListeners("join_chat");
    socket.on("join_chat" , async (chatId : string) => {
        const room = `chat:${chatId}`;

        if (socket.rooms.has(room)) {
            console.log(`ZATEN ODADA → ${socket.id}`);
            return;
        }

        const userId = socket.data.userId;
        const chat = await chatRepository.findChat(chatId);
        if(chat.getOwnerId() != userId && chat.getLikerId() != userId){
            throw new Error("Unauthorized to connect chat room");
        }
        
        socket.join(room);
        console.log(`${room} odasına join olundu`);

        const userType = chat.getOwnerId() == userId ?  "owner" : "liker";

        socket.emit("chat_joined", {
            senderType : userType
        });
    })


    socket.on("send_message" , async (chatId : string , content : string) => {
        const userId = socket.data.userId;
        const chat = await chatRepository.findChat(chatId);
        if (chat.getOwnerId() !== userId && chat.getLikerId() !== userId) {
            socket.emit("error_message", {
                message: "Unauthorized to connect chat room"
            });
            return;
        }
        const userType = chat.getOwnerId() == userId ?  "owner" : "liker";
        console.log("userType : " + userType);

        const message = new Message(chatId, userId , content)
        const createdMessage = await messageRepository.createMessage(message);
        io.to(`chat:${chat.getId()}`).emit("receive_message" , {content : createdMessage.getContent() , senderType : userType});
    })

    
}