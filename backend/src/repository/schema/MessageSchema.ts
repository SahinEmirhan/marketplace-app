import {Schema , model} from "mongoose"


const MessageSchema = new Schema({
    chatId : {required : true , type : String},
    senderId : {required : true , type : String},
    content : {required : true , type : String}
},
{
    timestamps : true
}
);

export const MessageModel = model("Message", MessageSchema);