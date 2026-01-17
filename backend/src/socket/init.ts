import {Server} from "socket.io"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"
import { registerChatHandlers } from "./ChatHandlers.js"

export const initSocket = (server : any)=> {
    const io = new Server(server , {
        cors : {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    io.use((socket , next)=> {
        const cookie = socket.handshake.headers.cookie;

        const token = cookie?.split("token=")[1];

        if(!token){
            console.log("Token bulunamadı. Cookie:", cookie);
            return next(new Error("Unauthorized"))
        }

        try{
            const payload = jwt.verify(token , process.env.ACCESS_SECRET as string) as JwtPayload;
            socket.data.userId = payload.userId;

            // Disconnect existing sockets for this user
            for (const [id, s] of io.sockets.sockets) {
                if (s.data.userId === payload.userId && id !== socket.id) {
                    console.log(`Disconnecting existing socket ${id} for user ${payload.userId}`);
                    s.disconnect();
                }
            }

            next();
        }catch(err){
            next(new Error("Unauthorized"));
        }


        io.on("connection" , (socket)=>{
            registerChatHandlers(io , socket);
            socket.on("disconnect", (reason) => {
                console.log("Disconnected:", socket.id, reason);
            });
        })

    })
}


