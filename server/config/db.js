const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/contact_mern");
    console.log("Connection to database established");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
};

module.exports = connectDB;
