const express = require("express");
const router = express.Router();
const userController=require('../controllers/users.js')

router.get('/new', userController.new)

// router.get('/', function(req, res, next) {
//   // res.send('A place for users');
// });

router.post('/', userController.create)

module.exports = router;
