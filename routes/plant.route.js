const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { plantModel } = require('../Model/plantModel');
const plantRouter = express.Router();

// plantRouter.use(auth)

plantRouter.post("/add",async(req,res)=>{
    try{
const post = new plantModel(req.body);
await post.save();
res.status(200).send({"postAdded":post})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


plantRouter.get("/",async(req,res)=>{
    try{
        const post = await plantModel.find();
        res.status(200).send(post)
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})



plantRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try{
    await plantModel.findByIdAndUpdate({_id:id},req.body);
    res.status(200).send("post updated")
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})


plantRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
    await plantModel.findByIdAndDelete({_id:id});
    res.status(200).send("post deleted")
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
module.exports={plantRouter}