const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config();

// import routers

const userRouter = require("./routers/users")
const authRouter = require("./routers/auth")

const app = express();
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connecting done database");
});

// midellware 
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())



app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


app.listen(PORT,()=>{
    console.log(`server run at ${PORT}` );
})




