const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");
var middleware = require("../middlewares/checkauth");

router.get("/show/", imageController.home);
router.post("/", imageController.addimg);
router.put("/edit/:id", imageController.editimg);
router.delete("/delete/:id", imageController.deleteimg);
router.get("/show/:id", imageController.showoneimg);

module.exports = router;
