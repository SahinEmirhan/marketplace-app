import type{AuthRequest} from "../dto/request/AuthRequest.js"
import User from "../entity/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {UserRepository} from "../repository/UserRepository.js"


export class AuthService{

    private readonly userRepository = new UserRepository();

    async register(authReq : AuthRequest){
        const isUserExist = await this.userRepository.isExist(authReq.email)
        if(isUserExist){
            throw new Error("User is Exist");
        }

        const encodedPassword = await bcrypt.hash(process.env.BCRYPT_SECRET + authReq.password, 12);
        const user : User = new User(authReq.email, encodedPassword);

        this.userRepository.save(user);
        return;
    }

    async login(authReq : AuthRequest){
        
        const user = await this.userRepository.findByEmail(authReq.email);
        if(!user){
            throw new Error("wrong email");
        }
        const isValidPassword = await bcrypt.compare(process.env.BCRYPT_SECRET + authReq.password , user?.getPassword() as string)
        if(!isValidPassword){
            throw new Error("wrong password");
        }

        const ACCESS_SECRET =  process.env.ACCESS_SECRET;
        const accessToken = jwt.sign({ userId : user.getId() }, ACCESS_SECRET as string, { expiresIn: "1h" });
        return accessToken; 
    }


}