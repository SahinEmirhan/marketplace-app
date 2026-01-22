import { Message } from "../entity/Message.js";
import { MessageModel } from "./schema/MessageSchema.js";
import { MessageMapper } from "./mapper/MessageMapper.js";
export class MessageRepository {
    async createMessage(message) {
        const createdMessage = await MessageModel.create(MessageMapper.toPersistance(message));
        return MessageMapper.toDomain(createdMessage);
    }
    async findChatMessages(chatId) {
        const messages = await MessageModel.find({ chatId: chatId });
        return messages.map(m => MessageMapper.toDomain(m));
    }
}
//# sourceMappingURL=MessageRepository.js.map