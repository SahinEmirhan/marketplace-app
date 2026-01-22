import { Chat } from "../../entity/Chat.js";
export class ChatMapper {
    static toDomain(doc) {
        return new Chat(doc.productId, doc.ownerId, doc.likerId, doc._id);
    }
    static toPersistance(chat) {
        return {
            productId: chat.getProductId(),
            ownerId: chat.getOwnerId(),
            likerId: chat.getLikerId()
        };
    }
}
//# sourceMappingURL=ChatMapper.js.map