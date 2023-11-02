const { mongoose } = require("../db");

const plantSchema = mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    price:Number,
    rating:Number,
},
{
    versionKey:false
})

const plantModel = mongoose.model("plant",plantSchema);


module.exports={plantModel}