const express = require("express");
const router = express.Router();
const blogsCtrl = require("../controllers/blogs");

router.get("/", blogsCtrl.index);

module.exports = router;