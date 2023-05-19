const express = require("express");
const router = express.Router();
const UserModel = require("../models/Username");

const cors = require('cors');
router.use(cors());


router.post("/", async (req, res) => {
  try {
    const { Username } = req.body;
    const newUser = new UserModel({ Username: Username });
    await newUser.save();
    res.status(201).json({ success: true, message: "Username saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Username not saved" });
  }
});
router.delete("/:Username", async (req, res) => {
  try {
    const { Username } = req.params;
    const deletedUser = await UserModel.findOneAndDelete({ Username});
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
