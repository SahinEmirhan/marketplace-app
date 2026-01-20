import {Schema, model} from "mongoose"

const ProductSchema = new Schema({
    name : {required : true , type : String},
    description : {required : true , type : String},
    price : {required : true , type : Number},
    imageKey : {required : true , type : String},
    owner : {required : true , type : String},
    likes : {required : false , type : [String]}
},
{
    timestamps : true
}
);


export const ProductModel = model("Product" , ProductSchema);


