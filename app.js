import express from "express";
import mongoose from "mongoose";
import userrouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import bcrypt from "bcrypt" ;
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middleware/error.js";
import corse from "cors"


const app = express() ;

config({
    path : "./data/config.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(corse({
    origin : [process.env.FRONTED_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true ,
}))

connectDB();
app.use("/api/v1/users",userrouter)
app.use("/api/v1/task",taskrouter)

// connectDB();



app.get("/",(req,res)=>{
res.send("nice work paras")
})

app.use(errormiddleware)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    
})