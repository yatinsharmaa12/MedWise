const express = require("express");
const router = express.Router();

const {signup,login,updateProfile,getAllDoctor,getDoctor} = require("../controller/docController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/updateProfile", updateProfile);
router.get("/getAll", getAllDoctor);
router.get("/get/:id", getDoctor);

module.exports = router;