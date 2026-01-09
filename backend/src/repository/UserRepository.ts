import type User from "../entity/User.js";
import {UserModel} from "./schema/UserSchema.js";
import {UserMapper} from "./mapper/UserMapper.js";


export class UserRepository{
    async findByEmail(email : string) : Promise<User | null>{
        const user = await UserModel.findOne({email : email});
        if(!user) throw new Error("User not found");
        return UserMapper.toDomain(user);
    }

    async isExist(email: string): Promise<boolean> {
        const isExist = await UserModel.exists({email : email});
        if(!isExist) return false;

        return true;
    }

    async save(user : User) : Promise<User>{
        const savedUser = await UserModel.create(UserMapper.toPersistance(user));
        return UserMapper.toDomain(savedUser);
    }
}