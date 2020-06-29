const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

router.post("/signup", authenticationController.signupUser);
router.post("/login", authenticationController.loginUser);

module.exports = router;
