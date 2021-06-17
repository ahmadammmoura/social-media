const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
      const { userName, Email, passWord } = req.body;
      const salt = await bcrypt.genSalt(10);
      const generatedPass = await bcrypt.hash(passWord, salt);
  
      const newUser = await new User({
        userName: userName,
        Email: Email,
        passWord: generatedPass
      });
  
      const user = await newUser.save();
  
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }


  const logInUser = async (req, res) => {
    try {
      const { Email, passWord } = req.body;
      const user = await User.findOne({ Email: Email });
      !user && res.status(404).json("theres no user");
  
      const validPass = await bcrypt.compare(passWord, user.passWord);
      !validPass && res.status(400).json("wrong password");
  
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }




  module.exports ={
    registerUser:registerUser,
    logInUser:logInUser
  }