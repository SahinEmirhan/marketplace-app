import type { HydratedDocument } from "mongoose";
import type { IUser } from "../User.js";
import bcrypt from "bcrypt";
export async function hashPassword(this : HydratedDocument<IUser>){
    const user = this;
    if(!user.isModified('password')){
        return;
    }

    const BCRYPT_SECRET = process.env.BCRYPT_SECRET;
    if (!BCRYPT_SECRET) {
        throw new Error('BCRYPT_SECRET is not defined');
    }
    this.password = await bcrypt.hash(BCRYPT_SECRET + this.password, 12);
}