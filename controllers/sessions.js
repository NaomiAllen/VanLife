const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const sessions = express.Router();


// get session
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});


// create session
sessions.post('/', (req, res) => {
    console.log(req.body)
    User.findOne({userName: req.body.userName}, (err, foundUser) => {
    if (err) {
        console.log(err);
        res.send('OOPS! Something went Wrong, Try Again');
    } else if (!foundUser) {
        res.send('<a href="/">Sorry, User Not Found </a>');
    } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/blogs')
        } else {
        res.send('<a href="/"> Invalid Password </a>')
        }
        };
    });
});


// end session
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
    res.redirect('/');
    });
});



module.exports = sessions;