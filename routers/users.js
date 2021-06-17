const router = require("express").Router()
const userController = require("../controller/user.controller")
const UserController = require("../controller/user.controller")

router.get("/:id",userController.getUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)


module.exports = router