const express = require('express');
const { userModel } = require('../model/userModel');
const userRouter = express.Router();
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const { blacklist } = require('../MiddleWare/blacklist');



userRouter.post("/signup",async(req,res)=>{
    const {email,name,password}=req.body
    try{
        const already = await userModel.findOne({email});
        if(already){
            res.status(200).send({"userAlreadyPresent":"Yes"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    return res.send("not hashed")
                }else{
                    const user = new userModel({
                        name,email,password:hash
                    });
                    await user.save();
                    res.status(200).send({"userAdded":user})
                }
            });
          
        }

    }
    catch(err){
        res.status(400).send({"err":err})
    }
})



userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
              if(result){
                var token = jwt.sign({email:user.email}, 'Ankit',{expiresIn:'7d'});
                res.status(200).send({"token":`${token}`,"user":user})
              }else{
                res.status(200).send({"msg":"wrong password"})
              }
            });
        }else{
            res.status(200).send({"msg":"wrong email"})
        }
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try{
        const newBlack = new blacklist({token});
        await newBlack.save();
        res.status(200).send({"msg":"logout successfully"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})



module.exports={userRouter}