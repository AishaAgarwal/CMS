const { validateContact, Contact } = require("../models/contact");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const router = require("express").Router();

router.post("/contact", auth, async (req, res) => {
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {name, address, email, phone} = req.body;
  const userId = req.user._id;
  console.log("userId: ", userId);

  try {
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      postedBy: userId,
    });

    const result = await newContact.save();
    return res.status(201).json({...result._doc});
  } catch (err) {
    console.log(err);
  }
});

// fetch contact.
router.get("/mycontacts", auth, async (req, res) => {
  try {
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ contacts: myContacts.reverse() });
  } catch (err) {
    console.log(err);
  }
});




module.exports = router;
