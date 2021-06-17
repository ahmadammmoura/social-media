const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const getUser = async(req, res) => {
  
    try{
        const {id}= req.params
        const user = await User.findById(id)

        const {passWord,updatedAt,...others}=user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }

};

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.passWord) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.passWord = await bcrypt.hash(req.body.passWord, salt);
      } catch (err) {
        res.status(500).json(err);
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        res.status(200).json("account has been updated");
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    res.status(403).json("you are not the user");
  }
};

const deleteUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("the user has been deleted");
    }catch(err) {
        res.status(500).json(err);
    }
  }else{
      res.status(403).json("you can delete only your account")
  }
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
