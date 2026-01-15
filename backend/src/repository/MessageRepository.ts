import { Message } from "../entity/Message.js";
import { MessageModel } from "./schema/MessageSchema.js";
import { MessageMapper } from "./mapper/MessageMapper.js";
export class MessageRepository{
    async createMessage(message : Message){
        const createdMessage = await MessageModel.create(MessageMapper.toPersistance(message));
        return MessageMapper.toDomain(createdMessage);
    }
}