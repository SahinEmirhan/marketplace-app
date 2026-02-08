import express, {urlencoded} from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import dotenv from 'dotenv'
import http from "http"
import {connectDB} from './config/database.js';
import {router as AuthRouter} from "./router/AuthRouter.js" 
import {router as ProductRouter} from "./router/ProductRouter.js"
import {router as ChatRouter} from "./router/ChatRouter.js"
import {initSocket} from './socket/init.js';


dotenv.config();

const app = express();
const server = http.createServer(app); 
const port = process.env.PORT;

export const sessionProperties = session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL as string,
    }),
    cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true,
    sameSite: "lax"
    },
    rolling: true
  });

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(sessionProperties);
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/auth" , AuthRouter);
app.use("/product" , ProductRouter);
app.use("/chat" , ChatRouter);

await connectDB();
initSocket(server);


server.listen(port , () => {
    console.log("Server is running on port at http://localhost:" + port);
})


