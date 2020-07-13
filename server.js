const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const blogsController = require('./controllers/blogs.js');
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const Blogs =require('./models/blog')

require('dotenv').config();
const PORT = process.env.PORT;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// middleware 
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


const isAuthenticated = (req, res, next) => {
  console.log(req.session.currentUser,"session user")
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
}

app.use('/blogs', isAuthenticated);

//mongodb
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blogs-app';
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongo connected');
});

app.use('/sessions', sessionsController);
app.use('/blogs', blogsController);
app.use('/users', usersController);

// index for site
app.get('/', (req, res) => {
  Blogs.find({}, (err, foundBlogs)=>{
    if (err){console.log(err)} else{
      res.render('index.ejs', {
        blogs: foundBlogs,
        currentUser: req.session.currentUser,
  });
      
  }
  })
});


app.listen(PORT, () => {
  console.log('listening');
});




