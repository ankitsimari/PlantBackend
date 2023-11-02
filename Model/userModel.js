const { mongoose } = require("../db");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
},
{
    versionKey:false
})

const userModel = mongoose.model("usersList",userSchema);

module.exports={userModel}