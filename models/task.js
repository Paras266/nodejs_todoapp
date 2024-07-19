import mongoose, { Types } from "mongoose"

const schema = new mongoose.Schema({
    title : {
        type : String ,
        require : true ,
    },
    description : {
        type : String ,
        require : true ,
        unique : true ,
     },
    password : {
        type : String,
        require : true ,
        select : false 
    } ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    } ,
    iscreated : {
        type : Boolean,
        default : false
    } ,

    createDAt :{
        type : Date ,
        default : Date.now ,
    }
}) ;

const Task = mongoose.model("Task" , schema)

export default Task ;