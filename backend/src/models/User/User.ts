import {Schema, Model , model} from "mongoose";

import {toPersistance} from "./mappers/toPersistance.js";
import {toDomain} from "./mappers/toDomain.js";
import {hashPassword} from "./functions/hashPassword.js";
import { verifyPassword } from "./functions/verifyPassword.js";

const MIN_PASSWORD_LENGTH = 8;
const MAX_DATABASE_ARRAY_FIELD_LENGTH = 1e4;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;

export interface IUser{
    id : string | null,
    email : string,
    password : string,
    products : number[]
}

const UserSchema = new Schema<IUser>(
    {
        email : {type : String , required : true , unique : true , maxLength : MAX_DATABASE_TEXT_FIELD_LENGTH , trim : true},
        password : {type : String , required : true , minLength : MIN_PASSWORD_LENGTH , maxLength : MAX_DATABASE_TEXT_FIELD_LENGTH},
        products : {type : [Number] , default : [] , maxLength : MAX_DATABASE_ARRAY_FIELD_LENGTH}
    },
    {
        timestamps : true
    }
)

export interface IUserModel extends Model<IUser>{
    isUserExist(email : String) : Promise<boolean>;
    createUser(user : IUser) : Promise<IUser>;
    findUserByEmailAndVerifyPassword(email : string , password : string) : Promise<IUser>;
}

export const User = model<IUser , IUserModel>("User" , UserSchema);

UserSchema.pre('save' , hashPassword);

UserSchema.statics.isUserExist = async function (email: string): Promise<boolean> {
  return await this.exists({email});
};

UserSchema.statics.createUser = async function (user: IUser): Promise<IUser> {    
    const userDoc = toPersistance(user);
    const savedUser = await userDoc.save();
    return toDomain(savedUser);
}

UserSchema.statics.findUserByEmailAndVerifyPassword = async function(email : string , password : string) : Promise<IUser>{
    const userDoc = await this.findOne({email : email});
    if(!userDoc){
        throw new Error("User not found");
    }

    const isPasswordValid = await verifyPassword(password , userDoc.password);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }

    return toDomain(userDoc);
}