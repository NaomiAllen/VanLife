const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('blogs/index', { title: 'Blog Index' });
});

module.exports = router;
