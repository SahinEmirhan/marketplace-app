import { Message } from "../entity/Message.js";
export declare class MessageRepository {
    createMessage(message: Message): Promise<Message>;
    findChatMessages(chatId: string): Promise<Message[]>;
}
//# sourceMappingURL=MessageRepository.d.ts.map