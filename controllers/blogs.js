const Blog = require("../models/blog");

module.exports = {
  index
};

function index(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) return next(err);
    res.render("blogs/index", { blogs });
  });
}

