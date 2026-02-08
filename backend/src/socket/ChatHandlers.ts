import {Chat} from "../models/Chat/Chat.js"
import {Message, type IMessage} from "../models/Message/Message.js";
import type {Socket} from "socket.io";

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
        const chat = await Chat.findChatByChatId(chatId);
        if(chat.ownerId != userId && chat.likerId != userId){
            throw new Error("Unauthorized to connect chat room");
        }
        
        socket.join(room);
        console.log(`${room} odasına join olundu`);

        const userType = chat.ownerId == userId ?  "owner" : "liker";

        socket.emit("chat_joined", {
            senderType : userType
        });
    })


    socket.on("send_message" , async (chatId : string , content : string) => {
        const userId = socket.data.userId;
        const chat = await Chat.findChatByChatId(chatId);
        if (chat.ownerId !== userId && chat.likerId !== userId) {
            socket.emit("error_message", {
                message: "Unauthorized to connect chat room"
            });
            return;
        }
        const userType = chat.ownerId == userId ?  "owner" : "liker";

        const createdMessage = await Message.saveMessage({chatId : chatId , senderId : userId , content : content} as IMessage);
        io.to(`chat:${chat.id}`).emit("receive_message" , {content : createdMessage.content , senderType : userType});
    })

    
}