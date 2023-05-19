const express = require("express");
const router = express.Router();
const UserModel = require("../models/Userinfo");
const cors = require('cors');
router.use(cors());
router.post("/", async (req, res) => {
  try {
    const { Username } = req.body;
    const { fname } = req.body;
    const { lname } = req.body;
    const { email } = req.body;
    const { mobile } = req.body;
    const { password } = req.body;
  
    const newUser = new UserModel({
      Username: Username,
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      password: password,
    
    });
    console.log(newUser)
    await newUser.save();
    res.status(201).json({ success: true, message: "Username saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Username not saved" });
  }
});
router.post("/check", async (req, res) => {
  try {
    const { Username, password } = req.body;

    const user = await UserModel.findOne({ Username, password });
    if (user) {
      res.status(200).json({ success: true, message: "User found" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});






router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await UserModel.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
