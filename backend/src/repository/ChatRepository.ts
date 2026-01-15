import { Chat } from "../entity/Chat.js";
import { ChatModel } from "./schema/ChatSchema.js";
import { ChatMapper } from "./mapper/ChatMapper.js";

export class ChatRepository{
    async findOrCreateChat(chat : Chat){
        const persistanceChat = ChatMapper.toPersistance(chat);
        const dbChat = ChatModel.findOneAndUpdate(persistanceChat , {$setOnInsert : persistanceChat} , {upsert : true , new : true});
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