import {Server} from "socket.io"
import * as jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"
import { registerChatHandlers } from "./ChatHandlers.js"

export const initSocket = (server : any)=> {
    const io = new Server(server , {
        cors : {origin : "*"}
    })

    io.use((socket , next)=> {
        const token = socket.handshake.auth?.token;
        if(!token){
            return next(new Error("Unauthorized"))
        }

        try{
            const payload = jwt.verify(token , process.env.ACCESS_SECRET as string) as JwtPayload;
            socket.data.userId = payload.userId;
            next();
        }catch(err){
            next(new Error("Unauthorized"));
        }


        io.on("connection" , (socket)=>{
            registerChatHandlers(io , socket);
        })

    })
}


