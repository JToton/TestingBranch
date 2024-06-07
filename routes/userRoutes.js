const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signupUser);
router.get("/login", userController.renderLoginForm);
router.post("/login", userController.loginUser);

module.exports = router;
