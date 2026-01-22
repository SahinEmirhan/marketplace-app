import { Message } from "../../entity/Message.js";
export class MessageMapper {
    static toDomain(doc) {
        return new Message(doc.chatId, doc.senderId, doc.content, doc._id);
    }
    static toPersistance(message) {
        return {
            chatId: message.getChatId(),
            senderId: message.getSenderId(),
            content: message.getContent()
        };
    }
}
//# sourceMappingURL=MessageMapper.js.map