const express = require('express');
const router = express.Router();

const Blog = require("../models/blog.js");

// const isAuthenticated = (req, res, next) => {
//   console.log(req.session.currentUser,"session user")
//   if (req.session.currentUser) {
//     return next();
//   } else {
//     res.redirect('/sessions/new');
//   }
// }

//ROUTES

//index
router.get('/', (req, res)=>{
  Blog.find({}, (error, foundBlog)=>{
    console.log(foundBlog)
    res.render('blogs/index.ejs', {
      blogs: foundBlog,
      currentUser: req.session.currentUser
    })
  })
})

//new
router.get('/new',(req, res) => {res.render('blogs/new.ejs', {
  currentUser: req.session.currentUser
});
})

//create
router.post('/', (req, res)=>{
    Blog.create(req.body, (err, createdBlog)=>{
    if (err){
    }else{
    res.redirect('/blogs');
    }
  })
})
  

//edit
router.get('/:id/edit',(req, res)=>{
  Blog.findById(req.params.id, (err, foundBlog)=>{ 
    console.log(foundBlog),
      res.render('blogs/edit.ejs', {
        blogs: foundBlog, 
        // blogs: foundBlog[req.params.id], //the fruit object
			  // id: req.params.id, 
        currentUser: req.session.currentUser
      })
  })
})

//update
router.put('/:id', (req, res)=>{
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
    console.log(updatedModel)
    res.redirect('/blogs');
  })
})



//show
router.get('/:id', (req, res) =>{
  Blog.findById(req.params.id, (err, foundBlog)=>{
    res.render('/blogs/show.ejs', {
      blogs: foundBlog,
      currentUser: req.session.currentUser
    })
  })
})

//delete
router.delete('/:id',(req, res) => {
  Blog.findByIdAndRemove(req.params.id, {useFindAndModify: false }, (err, data)=>{
    console.log(data)
    res.redirect('/blogs') 
  })
})

module.exports= router;