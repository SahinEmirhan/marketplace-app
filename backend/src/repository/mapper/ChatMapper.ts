import { Chat } from "../../entity/Chat.js";

export class ChatMapper{
    static toDomain(doc : any){
        return new Chat(doc.productId , doc.ownerId , doc.likerId , doc._id);
    }

    static toPersistance(chat : Chat){
        return {
            productId : chat.getProductId(),
            ownerId : chat.getOwnerId(),
            likerId : chat.getLikerId()
        }
    }
}