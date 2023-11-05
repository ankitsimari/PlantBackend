const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { plantRouter } = require('./routes/plant.route');
const { cartRouter } = require('./routes/cart.router');
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
app.use("/plants",plantRouter);
app.use("/cart",cartRouter);

const PORT = process.env.PORT
app.listen(PORT,async()=>{
await connection
console.log("DB is connected");
console.log("server is running")
})
