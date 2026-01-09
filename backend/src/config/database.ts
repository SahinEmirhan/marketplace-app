import mongoose from "mongoose";


export async function connectDB(){
    
    try{
        const MONGO_URI = process.env.MONGO_URL; 
        if (!MONGO_URI) {
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(MONGO_URI);
        console.log("successfully connected to database");
    }catch(err){
        throw new Error("DB Connection Error");
    }

    process.on("SIGINT" , () => {
        disconnectDB();
    })
}


export async function disconnectDB(){
    try{
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }catch(err){
        throw new Error("DB Disconnect Error");
    }
}