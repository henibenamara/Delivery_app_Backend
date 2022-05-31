var express = require('express');
var router = express.Router();
var {login,register}=require("../controllers/autentification.controllers")



/***
* @route Get api/auth/login
* @desc Login user
*/
router.post("/login",login);
/**
* @route POST api/auth/register
* @desc Register new user
* @access Public
*/
router.post("/register/:role",register);
module.exports = router;