const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


const User = require('../models/user.js');


//new
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
});


//create
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err){
            console.log(err)
        }else{
        console.log('user is created', createdUser);
        res.render('/sessions/new.ejs',{
            currentUser: createdUser
        })
        }
    });
});

//edit
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('views/edit.ejs', {
        user: foundUser,
        currentUser: req.session.currentUser
        });
    });
});

// update
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        res.redirect('/blogs');
    });
});

//show
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('views/show.ejs', {
        user: foundUser,
        currentUser: req.session.currentUser
        });
    });
});

module.exports = router;