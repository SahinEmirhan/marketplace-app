import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: { type: [Number], default: [] }
}, {
    timestamps: true
});
export const UserModel = model("User", UserSchema);
//# sourceMappingURL=UserSchema.js.map