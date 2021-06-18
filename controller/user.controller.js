const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const { passWord, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
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
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("cant delete this user");
  }
};

const followUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });

        res.status(200).json("done");
      } else {
        res.status(403).json("already followed ");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("thats your self");
  }

};

const unfollowUser = async (req, res) => {
    if (req.params.id !== req.body.userId) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });
  
          res.status(200).json("you unfollowd this user");
        } else {
          res.status(403).json("not in your following list");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("thats you");
    }
  
  };
  
module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  followUser: followUser,
  unfollowUser:unfollowUser
};
