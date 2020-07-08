
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const bcrypt = require('bcrypt')


require('dotenv').config();
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

const indexRouter = require("./routes/index");
const blogsRouter = require("./routes/blogs");
const usersRouter = require('./routes/users');

require("./config/database");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/blogs", blogsRouter);
app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//index

app.listen(PORT, function() {
  console.log(`running on port ${PORT}`)
});


