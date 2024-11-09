const express = require("express");
const router = express.Router();

const {signup,login,updateProfile} = require("../controller/docController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/updateProfile", updateProfile);


module.exports = router;