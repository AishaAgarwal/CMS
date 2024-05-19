const { validateContact, Contact } = require("../models/contact");
const auth = require("../middlewares/auth");
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

// router.put("/contact", , async(req,res) => {
  
// })

module.exports = router;
