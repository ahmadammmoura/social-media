const router = require("express").Router();



const auth = require("../controller/auth.controller")

router.post("/register", auth.registerUser );
router.post("/login", auth.logInUser );

module.exports = router;
