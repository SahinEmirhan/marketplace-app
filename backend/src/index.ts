import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import {router as AuthRouter} from "./router/AuthRouter.js" 
import { connectDB } from './config/database.js';

dotenv.config();

export const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/" , AuthRouter);



app.listen(port , () => {
    console.log("Server is running on port at http://localhost:" + port);
})

await connectDB();
