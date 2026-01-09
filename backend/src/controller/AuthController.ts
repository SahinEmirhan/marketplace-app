import type { Request, Response } from "express";
import {AuthRequestSchema } from "../dto/request/AuthRequest.js";
import {AuthService} from "../service/AuthService.js";

const service = new AuthService();

export async function login(req : Request, res : Response){
    const result = AuthRequestSchema.safeParse(req.body);
    
    if(!result.success){
        let error = JSON.parse(result.error.message)
        res.status(400).json({error : error[0].message});
        return;
    }

    const accessToken = await service.login(result.data);
    res.status(200).json({message : "Logined Successfully", accessToken : accessToken});
}

export async function register(req : Request, res : Response){
    const result = AuthRequestSchema.safeParse(req.body);
    if(!result.success){
        let error = JSON.parse(result.error.message)
        res.status(400).json({error : error[0].message});
        return;
    }

    await service.register(result.data);

    res.status(200).json({message : "User registered"});
    return;
}    

export async function logout(){
    console.log("Logging out user");
}