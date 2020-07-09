const express = require("express");
const router = express.Router();
const blogsCtrl = require("../controllers/blogs");

router.get("/", blogsCtrl.index);
router.get("/new", blogsCtrl.new);
router.delete("/delete", blogsCtrl.delete);



module.exports = router;
