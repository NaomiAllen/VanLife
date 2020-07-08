const Blog = require("../models/blog");

module.exports = {
  index,
  new: addNew,
  delete: deleteItem
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

function deleteItem(req,res){
  res.send('deleting')
}