import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import {router as AuthRouter} from "./router/AuthRouter.js" 
import {router as ProductRouter} from "./router/ProductRouter.js"
import { connectDB } from './config/database.js';

dotenv.config();

export const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/" , AuthRouter);
app.use("/product" , ProductRouter )

await connectDB();
app.listen(port , () => {
    console.log("Server is running on port at http://localhost:" + port);
})


