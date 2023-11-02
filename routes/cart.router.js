const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { cartModel } = require('../Model/cartModel');
const cartRouter = express.Router();

cartRouter.use(auth);


cartRouter.post("/add",async(req,res)=>{
    try{
const post = new cartModel(req.body);
await post.save();
res.status(200).send({"postAdded":post})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


cartRouter.get("/",async(req,res)=>{
    const {email}=req.body;
    console.log(email)
    try{
        const post = await cartModel.find({email});
        res.status(200).send(post)
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})




cartRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try{
    await cartModel.findByIdAndUpdate({_id:id},req.body);
    res.status(200).send("cart_updated")
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


cartRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
    await cartModel.findByIdAndDelete({_id:id});
    res.status(200).send("deleted_from_cart")
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
module.exports={cartRouter}