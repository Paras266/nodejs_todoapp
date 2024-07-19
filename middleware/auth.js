import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export const isauthenticated = async (req,res,next)=>{
    let { token } = req.cookies ;
    if (!token) {
      return res.status(404).json({
          status : false ,
          message : "Login First"
      })
    }
  
    let decoded = jwt.verify(token,process.env.JWT_CODE)
    req.user = await User.findById(decoded._id)
    next();
}