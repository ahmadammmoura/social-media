const router = require("express").Router()
const userController = require("../controller/user.controller")

router.get("/:id",userController.getUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)
router.put("/:id/follow",userController.followUser)
router.put("/:id/unfollow",userController.unfollowUser)



module.exports = router