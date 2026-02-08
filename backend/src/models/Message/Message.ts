import { Schema, model, Model} from "mongoose";
export interface IMessage{
    id : string | null;
    chatId : string;
    senderId : string;
    content : string;
}

const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;


const messageSchema = new Schema<IMessage>({
    chatId : {required : true , type : String},
    senderId : {required : true , type : String},
    content : {required : true , type : String, trim: true , maxLength : MAX_DATABASE_TEXT_FIELD_LENGTH}
},
{
    timestamps : true
}
);

export interface IMessageModel extends Model<IMessage>{
    saveMessage(message : IMessage) : Promise<IMessage>;
    findMessagesByChatId(chatId : string) : Promise<IMessage[]>;
}

export const Message = model<IMessage , IMessageModel>("Message" , messageSchema);

messageSchema.statics.saveMessage = async function(message : IMessage){
    const messageDoc = new Message(message);
    const savedMessage = await messageDoc.save();
    return savedMessage;
}

messageSchema.statics.findMessagesByChatId = async function(chatId : string) : Promise<IMessage[]>{
    const messages = await this.find({chatId : chatId}).sort({createdAt : 1});
    return messages;
}

