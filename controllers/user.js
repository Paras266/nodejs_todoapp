import erros from "../middleware/error.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { setcookie } from "../utils/setcookie.js";


export const Getalluser = async (req, res) => {

}

export const Registernewuser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })
        if (user) return next(new erros("User Alredy Exist", 400));

        const hashpassword = await bcrypt.hash(password, 10);
        user = User.create({ name, email, password: hashpassword });
        setcookie(user, res, "registration complete", 201);
    } catch (error) {
        next(error)
    }

}




export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password")

        if (!user) return next(new erros("Incorrect Email or Password", 404));


        const newLocal = await bcrypt.compare(password, user.password);
        const ismatch = newLocal
        console.log(ismatch);

        if (!ismatch) return next(new erros("Incorrect Email or Password", 404));


        setcookie(user, res, `Welcome , ${user.name}`, 201)
    } catch (error) {
        next(error)
    }

}

export const Getuserbyid = async (req, res) => {
    try {

        res.status(200).json({
            status: true,
            user: req.user,
        })
    } catch (error) {
        next(error);
    }

}



export const logout = (req, res) => {

    res.status(200)
        .cookie("token", "", { 
            httponly : true ,
            expires: new Date(Date.now()) ,
            sameSite :process.env.NODE_ENV === "development" ? "lax" : "none" ,
            secure :process.env.NODE_ENV === "development" ? false : true , }).
        json({
            status: true,
            message: "logged out"
        })

}