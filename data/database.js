import mongoose from "mongoose";

export const connectDB = ()=>{ mongoose.connect(process.env.DATABASE_URI,{
    dbName:"BackendApi" ,
}).then((c)=>{console.log(`database is connected ${c.connection.host}`)
}).catch((e)=>{console.error(e);});
}