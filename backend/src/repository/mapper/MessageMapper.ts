import {Message} from "../../entity/Message.js"

export class MessageMapper{
    static toDomain(doc : any){
        return new Message(doc.chatId , doc.senderId , doc.content , doc._id);
    }

    static toPersistance(message : Message){
        return {
            chatId : message.getChatId(),
            senderId : message.getSenderId(),
            content : message.getContent()
        }
    }
}