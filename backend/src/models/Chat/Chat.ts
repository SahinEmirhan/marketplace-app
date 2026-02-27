import mongoose, { Schema, model, Model , Types } from "mongoose";
import { ChatResponse } from "../../dto/response/ChatResponse.js";
import { MessageResponse } from "../../dto/response/MessageResponse.js";
import {Product, type IProduct} from "../Product/Product.js";
import type { IUser } from "../User/User.js";
import {type IMessage } from "../Message/Message.js";
import { getSignedImageUrl } from "../../s3/getSignedImageUrl.js";
import { toDomain } from "./mappers/toDomain.js";
import {type HydratedDocument } from "mongoose";


export interface IChat{
    id : string | null;
    productId : Types.ObjectId | IProduct;
    ownerId : Types.ObjectId | IUser;
    likerId : Types.ObjectId | IUser;
    messages?: IMessage[];
}

const ChatSchema = new Schema({
    productId : {required : true , type : Schema.Types.ObjectId, ref : "Product"},
    ownerId : {required : true , type : Schema.Types.ObjectId, ref : "User"},
    likerId : {required : true , type : Schema.Types.ObjectId, ref : "User"}
},
{
    timestamps : true, toJSON: { virtuals: true }, toObject: { virtuals: true }
}
)

ChatSchema.index({
    ownerId : 1 , likerId : 1
},
{
    unique : true
}
)

ChatSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "chatId",
  options: { sort: { createdAt: 1 } }
});

export interface IChatModel extends Model<IChat>{
    findOrCreateChat(productId : string, userId : string) : Promise<IChat>;
    findChatByChatId(chatId : string) : Promise<IChat>;
    findChatsByUserId(userId : string) : Promise<IChat[]>;
    findChatMessagesByUserId(userId : string , chatId : string) : Promise<MessageResponse[]>;
}

export const Chat = model<IChat , IChatModel>("Chat" , ChatSchema);


ChatSchema.statics.findOrCreateChat = async function(productId : string, userId : string) : Promise<ChatResponse>{
    const session = await mongoose.startSession();
    try{
        return await session.withTransaction(async () => {
            const product = await Product.findById(productId);
            if(!product){
                throw new Error("Product not found");
            }
            if(product.owner.toString() === userId){
                    throw new Error("Owner cannot start chat with himself")
            }
            if(!product.likes.includes(userId)){
                    throw new Error("Like required");
            }
            const newChat : IChat = {
                id : null,
                productId : new Types.ObjectId(productId),
                ownerId : product.owner,
                likerId : new Types.ObjectId(userId)
            }
            const chatDoc = await this.findOneAndUpdate(newChat , {$setOnInsert : newChat} , {upsert : true , new : true});
            if(!chatDoc){
                throw new Error("find or create chat error")
            }
            const signedImageUrl =  await getSignedImageUrl(product.imageKey)

            return new ChatResponse(chatDoc.getId() as string , product.name , product.price , signedImageUrl );
        })
    }catch(err){
        throw err;
    }finally{
        await session.endSession();
    }
}


ChatSchema.statics.findChatByChatId = async function(chatId : string) : Promise<IChat>{
    const chat = await this.findById(chatId);   
    if(!chat){
        throw new Error("Chat not found");
    }
    return chat;
}

ChatSchema.statics.findChatsByUserId = async function(userId : string){
        const chatDocs = await this.find({ $or : [{ownerId : userId}, {likerId : userId}]}).populate("productId" , "name price imageKey");
        if (!chatDocs){
            return [];
        }
        const chats = chatDocs.map((c : HydratedDocument<IChat>) => toDomain(c));
        const chatProducts : IProduct[] = chats.map((c: IChat) => c.productId as IProduct).filter((p : IProduct) => p != null) as IProduct[];
        if(chatProducts.length == 0){
            return [];
        }

        const chatsResList : ChatResponse[] = [];
        for(let i = 0 ; i < chatProducts.length; i++){
            const signedImageUrl =  await getSignedImageUrl(chatProducts[i]!.imageKey)
            chatsResList.push(new ChatResponse(chats[i]?.id as string , chatProducts[i]!.name, chatProducts[i]!.price, signedImageUrl))
        }

        return chatsResList;
    }

 ChatSchema.statics.findChatMessagesByUserId = async function(userId : string , chatId : string){
            const chatDoc = await this.findOne({_id : chatId}).populate("messages");
            if (!chatDoc) {
                throw new Error("Chat not found");
            }
            if (chatDoc.ownerId.toString() !== userId && chatDoc.likerId.toString() !== userId) {
                throw new Error("Unauthorized");
            }
    
            const messages = chatDoc.messages || [];
    
            const messageResponseList : MessageResponse[] = []
            messages.map((m : IMessage) => {
                let userType = "liker";
                if(m.senderId.toString() == chatDoc.ownerId.toString()){
                    userType = "owner"
                }
                messageResponseList.push(new MessageResponse(m.content , userType))
            });
            return messageResponseList;
        }



   