import express from "express";
import bcrypt from "bcrypt";
import { createUser, genPassword, getUserByName } from "../helper.js";


const router = express.Router();
// SignUp
router.post("/signup",async(req,res)=>{
    const { username,password } = req.body ;
    console.log(username,password)
    
    const isUserExist = await getUserByName(username)
    if(isUserExist){
        res.status(400).send({message:"Username already taken"})
        return;
    }
    if(
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%&]).{8,}$/g.test(password)
    ){
        res.status(400).send({message:"Password Pattern not Matched"})
        return;
    }
    const hashedPassword = await genPassword(password)
    const result = await createUser(username, hashedPassword) 
    res.send(result)
})

// Login
router.post("/login",async(req,res)=>{
    const { username,password } = req.body ;
    console.log(username,password)
    
    const userFromDB = await getUserByName(username)
    console.log(userFromDB)
    if(!userFromDB){
        res.status(400).send({message:"Invalid Credentials"})
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password,userFromDB.password)
    if(!isPasswordMatch){
        res.status(400).send({message:"Invalid Credentials"})
        return;
    }

    res.send(isPasswordMatch)

})

export const usersRouter = router;