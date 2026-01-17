import { ProductRepository } from "../repository/ProductRepository.js"
import { ChatRepository } from "../repository/ChatRepository.js";
import {Chat} from "../entity/Chat.js"
export class ChatService{

    private readonly productRepository = new ProductRepository();
    private readonly chatRepository = new ChatRepository();
    async createChatRoom(productId : string, userId : string){
        const product = await this.productRepository.getProduct(productId);
        if(product.getOwner() == userId){
            throw new Error("Owner cannot start chat with himself")
        }
        if(!product.getLikes().includes(userId)){
            throw new Error("Like required");
        }
        const newChat = new Chat(productId , product.getOwner() , userId);
        const chat = await this.chatRepository.findOrCreateChat(newChat);
        console.log(JSON.stringify(chat));
        return chat.getId();
    }

}