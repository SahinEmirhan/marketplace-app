import { Chat } from "../../entity/Chat.js";
export declare class ChatMapper {
    static toDomain(doc: any): Chat;
    static toPersistance(chat: Chat): {
        productId: string;
        ownerId: string;
        likerId: string;
    };
}
//# sourceMappingURL=ChatMapper.d.ts.map