const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path:"./config/config.env" });

const auth = require("../middlewares/auth");

router.post("/login", async(req,res) => {
    const {email, password} = req.body;
        if(!email || !password) 
            return res.status(400)
            .json({error: "Please enter all the required fields"});
         const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
        if (!emailReg.test(email))
            return res
            .status(400)
            .json({error: "please enter a valid email address."});
        
    try{
        const doesUserExists = await User.findOne({email});
        if (!doesUserExists)
            return res.status(400)
            .json({error: "please enter a valid email id or password"});

        const doesPasswordMatch = await bcrypt.compare(password, doesUserExists.password);

        if (!doesPasswordMatch)
            return res.status(400)
            .json({error: "Invalid email or password"});
        const payload = {_id: doesUserExists._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "1h"});
        // console.log(token)
        const user = {...doesUserExists._doc, password: undefined}
        return res.status(200).json({token, user})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
});

router.post("/register", async(req,res)=> {
    const {name, email, password} = req.body;

    // check all the missing fields 
    if (!email || !name || !password) 
        return res
        .status(400)
        .json({error: "Please enter all the required fields"});

    // email validation 
    const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (!emailReg.test(email))
        return res
        .status(400)
        .json({error: "please enter a valid email address."});

    // password validation 
    if (password.length < 6)
        return res.status(400)
        .json({error: "password must be of at least 6 charachters."});
        
    try{
        const docUserAlreadyExist = await User.findOne({email});
        if (docUserAlreadyExist) 
            return res.status(400)
            .json({error: `A user with that email [${email}] already exists. `});

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name, email, password : hashedPassword});
        const result = await newUser.save();
        
        result._doc.password = undefined;
        return res.status(201).json({...result._doc })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
});

router.get("/me", auth, async(req,res) => {
    return res.status(200).json({...req.user._doc});
});

module.exports = router;
