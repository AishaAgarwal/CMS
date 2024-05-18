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

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));


//server configuration 
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    await connectDB(); 
    console.log(`Server listening on port: ${PORT}`)}); 