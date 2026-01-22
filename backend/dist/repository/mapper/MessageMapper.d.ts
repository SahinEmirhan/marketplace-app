import { Message } from "../../entity/Message.js";
export declare class MessageMapper {
    static toDomain(doc: any): Message;
    static toPersistance(message: Message): {
        chatId: string;
        senderId: string;
        content: string;
    };
}
//# sourceMappingURL=MessageMapper.d.ts.map