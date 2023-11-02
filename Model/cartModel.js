const { mongoose } = require("../db");


const cartSchema = mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    price:Number,
    rating:Number,
    email:String
},
{
    versionKey:false
})


const cartModel = mongoose.model("cart",cartSchema);


module.exports={cartModel}