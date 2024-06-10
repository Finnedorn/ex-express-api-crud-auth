const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../middlewares/validator");
const {registerChecker,loginChecker} = require("../validations/auths");

router.post("/register", validator(registerChecker), authController.register);

router.post("/login", validator(loginChecker), authController.login);

module.exports = router;