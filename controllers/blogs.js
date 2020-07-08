const Blog = require("../models/blog");

module.exports = {
  index,
  new: addNew
};

function index(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) return next(err);
    res.render("blogs/index", { blogs });
  });
}

function addNew(req, res){
  res.render("blogs/new.ejs")
}