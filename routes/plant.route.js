const express = require('express');
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


// plantRouter.get("/",async(req,res)=>{
//     try{
//         const post = await plantModel.find();
//         res.status(200).send(post)
//     }
//     catch(err){
//         res.status(400).send({"err":err})
//     }
// })


plantRouter.get("/", async (req, res) => {
    try {
        const { category, sort, page, limit } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        let sortOptions = {};
        if (sort) {
            if (sort === 'asc') {
                sortOptions = { price: 1 }; // Sort in ascending order by price field
            } else if (sort === 'desc') {
                sortOptions = { price: -1 }; // Sort in descending order by price field
            }
        }

        const perPage = parseInt(limit) || Infinity; // Number of records per page, default to 6 if not provided
        const currentPage = parseInt(page) || 1; // Current page (default to 1 if not provided)

        const skip = (currentPage - 1) * perPage;

        const totalPosts = await plantModel.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / perPage);

        const posts = await plantModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(perPage);

        res.status(200).send({
            plants: posts,
            currentPage: currentPage,
            totalPages: totalPages
        });
    } catch (err) {
        res.status(400).send({ "err": err });
    }
});






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