import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import {router as AuthRouter} from "./router/AuthRouter.js" 
import {router as ProductRouter} from "./router/ProductRouter.js"
import { connectDB } from './config/database.js';
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import { initSocket } from './socket/init.js';

dotenv.config();

const app = express();
const server = http.createServer(app); 
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser()); // Cookie'leri parse etmek için
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/" , AuthRouter);
app.use("/product" , ProductRouter )

await connectDB();
initSocket(server);


server.listen(port , () => {
    console.log("Server is running on port at http://localhost:" + port);
})


