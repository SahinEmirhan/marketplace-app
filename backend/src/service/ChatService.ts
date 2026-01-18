import { ProductRepository } from "../repository/ProductRepository.js"
import { ChatRepository } from "../repository/ChatRepository.js";
import {Chat} from "../entity/Chat.js"
import { getSignedImageUrlFromS3 } from "../aws/s3.js";
import { ChatResponse } from "../dto/response/ChatResponse.js";
import Product from "../entity/Product.js";
import { MessageRepository } from "../repository/MessageRepository.js";
import { MessageResponse } from "../dto/response/MessageResponse.js";
export class ChatService{

    private readonly productRepository = new ProductRepository();
    private readonly chatRepository = new ChatRepository();
    private readonly messageRepository = new MessageRepository();
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
        const signedImageUrl =  await getSignedImageUrlFromS3(product.getImageKey())
        return new ChatResponse(chat.getId() as string , product.getName() , product.getPrice() , signedImageUrl );
    }

    async getMyChats(userId : string){
        
        const chats = await this.chatRepository.findMyChats(userId);
        const chatProducts : Product[] = await Promise.all(chats.map((c) => this.productRepository.getProduct(c.getProductId())));
        if(chatProducts.length == 0){
            return [];
        }

        const chatsResList : ChatResponse[] = [];
        for(let i = 0 ; i < chatProducts.length; i++){
            const signedImageUrl =  await getSignedImageUrlFromS3(chatProducts[i]!.getImageKey())
            chatsResList.push(new ChatResponse(chats[i]?.getId() as string , chatProducts[i]!.getName(), chatProducts[i]!.getPrice(), signedImageUrl))
        }

        return chatsResList;
    }

    async getChatMessages(userId : string , chatId : string){
        const chat = await this.chatRepository.findChat(chatId);
        if (chat.getOwnerId() !== userId && chat.getLikerId() !== userId) {
            throw new Error("Unauthorized");
        }

        const messages = await this.messageRepository.findChatMessages(chatId);

        const messageResponseList : MessageResponse[] = []
        messages.map(m => {
            let userType = "liker";
            if(m.getSenderId() == chat.getOwnerId()){
                userType = "owner"
            }
            messageResponseList.push(new MessageResponse(m.getContent() , userType))
        });
        return messageResponseList;
    }

}