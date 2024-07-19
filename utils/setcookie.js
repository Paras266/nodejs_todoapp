import jwt from "jsonwebtoken"

export const  setcookie = (user,res,message,statuscode=200)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_CODE)
    
    res.status(statuscode).cookie("token" , token , {
          maxage : 15*60*1000 ,
          httpOnly : true ,
          sameSite :process.env.NODE_ENV === "development" ? "lax" : "none" ,
          secure :process.env.NODE_ENV === "development" ? false : true ,
    }).json({
        status : true ,
        message ,
    })
}