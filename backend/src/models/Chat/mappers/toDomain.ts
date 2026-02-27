import {type IChat} from "../Chat.js";
import { type HydratedDocument } from "mongoose";
export function toDomain(doc : HydratedDocument<IChat>) : IChat{
    return {
        id : doc._id.toString(),
        productId : doc.productId,
        ownerId : doc.ownerId,
        likerId : doc.likerId
    }
}