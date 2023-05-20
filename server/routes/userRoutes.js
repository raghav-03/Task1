const express = require("express");
const router = express.Router();
var usercontroller = require("../controller/userController");
var middleware = require("../middlewares/checkauth");

router.post("/signup", usercontroller.signup);
router.get("/logout", usercontroller.logout);
router.post("/login", usercontroller.login);
router.post("/forgot", usercontroller.forgotpass);
router.post("/resetpass/:token", usercontroller.changepass);
router.put("/updateuser", middleware.islogin, usercontroller.updateuser);
router.get("/userdetail", middleware.islogin, usercontroller.getuserdetail);
router.post("/updatepass", middleware.islogin, usercontroller.updatepass);
module.exports = router;
