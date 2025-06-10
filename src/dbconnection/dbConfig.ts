import { error } from "console";
import mongoose from "mongoose";


export async function connect() {
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("MongoDB Connection Successfull");
        })
        connection.on("error", (error)=>{
            console.log(error)
            process.exit();
        });
    }catch(error){
        console.log("Something went wrong!!");
        console.log(error)
    }
}