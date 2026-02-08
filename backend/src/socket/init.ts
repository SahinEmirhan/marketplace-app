import {registerChatHandlers} from "./ChatHandlers.js"
import {Server} from "socket.io"
import type { Request, Response } from "express";
import {sessionProperties} from "../index.js";
import sharedSession from "express-socket.io-session";
export const initSocket = (server : any)=> {
    const io = new Server(server , {
        cors : {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

io.use(
  sharedSession(sessionProperties, {
    autoSave: true
  })
);

io.use((socket, next) => {
  const session = (socket.request as any).session

  if (!session?.user) {
    return next(new Error("Unauthorized"));
  }

  const userId = session.user.id;
  socket.data.userId = userId;

  // Aynı user'ın eski socketlerini düşür
  for (const [id, s] of io.sockets.sockets) {
    if (s.data.userId === userId && id !== socket.id) {
      console.log(`Disconnecting existing socket ${id} for user ${userId}`);
      s.disconnect(true);
    }
  }

  next();

    io.on("connection" , (socket)=>{
        registerChatHandlers(io , socket);
        socket.on("disconnect", (reason) => {
            console.log("Disconnected:", socket.id, reason);
        });
        })

    })
}


