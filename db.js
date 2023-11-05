const mongoose = require("mongoose");
require("dotenv").config()
// const connection = mongoose.connect('mongodb+srv://ankitsimari:ankit123@cluster0.qb2hai2.mongodb.net/InstaMasai?retryWrites=true&w=majority')
// const connection = mongoose.connect(process.env.URL)
const connection = mongoose.connect('mongodb+srv://ankitsimari:ankit123@cluster0.qb2hai2.mongodb.net/Garden?retryWrites=true&w=majority')


module.exports={mongoose,connection}