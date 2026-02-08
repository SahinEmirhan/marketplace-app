import { Schema, model, Model } from "mongoose";
import { ChatResponse } from "../../dto/response/ChatResponse.js";
import { MessageResponse } from "../../dto/response/MessageResponse.js";
import {Product, type IProduct} from "../Product/Product.js";
import { Message } from "../Message/Message.js";
import { getSignedImageUrl } from "../../s3/getSignedImageUrl.js";

export interface IChat{
    id : string | null;
    productId : string;
    ownerId : string;
    likerId : string;
}

const ChatSchema = new Schema({
    productId : {required : true , type : String},
    ownerId : {required : true , type : String},
    likerId : {required : true , type : String}
},
{
    timestamps : true
}
)

ChatSchema.index({
    ownerId : 1 , likerId : 1
},
{
    unique : true
}
)

export interface IChatModel extends Model<IChat>{
    findOrCreateChat(productId : string, userId : string) : Promise<IChat>;
    findChatByChatId(chatId : string) : Promise<IChat>;
    findChatsByUserId(userId : string) : Promise<IChat[]>;
    findChatMessagesByUserId(userId : string , chatId : string) : Promise<MessageResponse[]>;
}

export const Chat = model<IChat , IChatModel>("Chat" , ChatSchema);


ChatSchema.statics.findOrCreateChat = async function(productId : string, userId : string) : Promise<ChatResponse>{
    const product = await Product.findById(productId);
    if(!product){
        throw new Error("Product not found");
    }
    if(product.owner == userId){
            throw new Error("Owner cannot start chat with himself")
        }
    if(!product.likes.includes(userId)){
            throw new Error("Like required");
    }
    const newChat : IChat = {
        id : null,
        productId : productId,
        ownerId : product.owner,
        likerId : userId
    }
    const chatDoc = await this.findOneAndUpdate(newChat , {$setOnInsert : newChat} , {upsert : true , new : true});
    if(!chatDoc){
        throw new Error("find or create chat error")
    }
    const signedImageUrl =  await getSignedImageUrl(product.imageKey)

     return new ChatResponse(chatDoc.getId() as string , product.name , product.price , signedImageUrl );
}


ChatSchema.statics.findChatByChatId = async function(chatId : string) : Promise<IChat>{
    const chat = await this.findById(chatId);   
    if(!chat){
        throw new Error("Chat not found");
    }
    return chat;
}

ChatSchema.statics.findChatsByUserId = async function(userId : string){
        
        const chats = await this.find({ $or : [{ownerId : userId}, {likerId : userId}]});
        if (!chats){
            return [];
        }
        const chatProducts : IProduct[] = await Promise.all(chats.map((c : IChat) => Product.findProductById(c.productId)));
        if(chatProducts.length == 0){
            return [];
        }

        const chatsResList : ChatResponse[] = [];
        for(let i = 0 ; i < chatProducts.length; i++){
            const signedImageUrl =  await getSignedImageUrl(chatProducts[i]!.imageKey)
            chatsResList.push(new ChatResponse(chats[i]?.getId() as string , chatProducts[i]!.name, chatProducts[i]!.price, signedImageUrl))
        }

        return chatsResList;
    }

 ChatSchema.statics.findChatMessagesByUserId = async function(userId : string , chatId : string){
            const chatDoc = await this.findOne({_id : chatId});
            if (!chatDoc) {
                throw new Error("Chat not found");
            }
            if (chatDoc.ownerId !== userId && chatDoc.likerId !== userId) {
                throw new Error("Unauthorized");
            }
    
            const messages = await Message.findMessagesByChatId(chatId);
    
            const messageResponseList : MessageResponse[] = []
            messages.map(m => {
                let userType = "liker";
                if(m.senderId == chatDoc.ownerId){
                    userType = "owner"
                }
                messageResponseList.push(new MessageResponse(m.content , userType))
            });
            return messageResponseList;
        }



   