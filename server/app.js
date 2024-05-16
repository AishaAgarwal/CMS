const express = require('express')
const mongoose = require('mongoose')
const morgan = require("morgan");
const connectDB = require("./config/db")
const auth = require("./middlewares/auth");

const app = express();

//middlewares 
app.use(express.json());// for returning in json format 
app.use(morgan("tiny")); // for logging in console whenever an API gets hit 
app.use(require('cors')());
//routes
app.get("/protected",auth, (req,res) => {
    return res.status(200)
    .json({user: req.user});
} )
app.use("/api", require("./routes/auth"))

app.get("/", (req, res) => {
    res.send("Hello ");
})

//server configuration 
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    await connectDB(); 
    console.log(`Server listening on port: ${PORT}`)}); 