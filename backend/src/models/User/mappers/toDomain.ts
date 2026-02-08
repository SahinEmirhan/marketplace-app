import { type IUser } from "../User.js"
import type { HydratedDocument } from "mongoose";
export function toDomain(doc : HydratedDocument<IUser>) : IUser{
        return{
            id : doc._id.toString(),
            email : doc.email,
            password : doc.password,
            products : doc.products
        }
}