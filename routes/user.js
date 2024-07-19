import express from "express"
import User from "../models/user.js";
import { Getalluser, Getuserbyid, login, Registernewuser , logout } from "../controllers/user.js";
import { isauthenticated } from "../middleware/auth.js";



const router = express.Router();

router.get("/all", Getalluser)

router.post("/new", Registernewuser)

router.post("/login", login)

router.get("/logout" ,  logout)

router.get("/me", isauthenticated , Getuserbyid)

export default router;