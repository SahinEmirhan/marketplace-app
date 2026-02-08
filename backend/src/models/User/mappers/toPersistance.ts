
import { User, type IUser } from "../User.js"
export function toPersistance(user : IUser){
    if (!user) {
        throw new Error('User object is undefined or null');
    }
    if(!user.email || !user.password || !user.products){
        throw new Error('User email, password, or products are missing');
    }
    return new User({
        _id : user.id,
        email : user.email,
        password : user.password,
        products : user.products
    });
}