import { Chat } from "../entity/Chat.js";
import { ChatModel } from "./schema/ChatSchema.js";
import { ChatMapper } from "./mapper/ChatMapper.js";

export class ChatRepository{
    async findOrCreateChat(chat : Chat){
        const persistanceChat = ChatMapper.toPersistance(chat);
        console.log("persistance chat : " + JSON.stringify(persistanceChat));
        const dbChat = await ChatModel.findOneAndUpdate(persistanceChat , {$setOnInsert : persistanceChat} , {upsert : true , new : true});
        console.log("dbChat : " + dbChat);
        if(!dbChat){
            throw new Error("find or create chat error")
        }
        return ChatMapper.toDomain(dbChat);
    }


    async findChat(chatId : string){
        const chat = await ChatModel.findById(chatId);
        if(!chat){
            throw new Error("Chat not found");
        }
        return ChatMapper.toDomain(chat);
    }
}