const { validateContact } = require('../models/contact');

const router = require('express').Router();

router.post("/contact", async(req,res) => {
    const {error} = validateContact(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }
   
     try{

    }
    catch(err){

    }
});

module.exports = router;