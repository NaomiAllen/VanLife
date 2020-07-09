
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const bcrypt = require('bcrypt');
const session = require('express-session');
const hashedString = bcrypt.hashSync('this is my string', bcrypt.genSaltSync(10))
const userController = require('./controllers/users.js')
app.use('/users', userController)

require('dotenv').config();
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

const indexRouter = require("./routes/index");
const blogsRouter = require("./routes/blogs");
const usersRouter = require('./routes/users');

require("./config/database");



// view setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/blogs", blogsRouter);
app.use('/users', usersRouter);

app.use(
  session({
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false 
  })
)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


app.listen(PORT, function() {
  console.log(`running on port ${PORT}`)
});


