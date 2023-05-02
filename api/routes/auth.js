import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("you are user");
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("you are admin");
})

// CREATE USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// LOGOUT USER
router.put("/logout", logout);
export default router;
