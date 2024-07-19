import mongoose from "mongoose";

export const connectDB = ()=>{ mongoose.connect(process.env.DATABASE_URI,{
    dbName:"BackendApi" ,
}).then(()=>{console.log("database is connected")
}).catch((e)=>{console.error(e);});
}