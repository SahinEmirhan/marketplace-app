import { Schema, model } from "mongoose";
const ChatSchema = new Schema({
    productId: { required: true, type: String },
    ownerId: { required: true, type: String },
    likerId: { required: true, type: String }
}, {
    timestamps: true
});
ChatSchema.index({
    productId: 1, ownerId: 1, likerId: 1
}, {
    unique: true
});
export const ChatModel = model("Chat", ChatSchema);
//# sourceMappingURL=ChatSchema.js.map