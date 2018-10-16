const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Question = require('../models/Question');
const bcrypt = require('bcryptjs');
const {ensureAuthenticated, ensureNotAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');

router.get('/login', ensureNotAuthenticated, (req, res, next) => {
    res.render('users/login');
});

router.post('/login', ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are successfully logged out');
    res.redirect('/users/login');
});

router.get('/register', ensureNotAuthenticated,  (req, res) => {
    res.render('users/register');
});

router.post('/register', ensureNotAuthenticated, (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.cPassword) {
        errors.push({text: 'Passwords do not match'});
    }

    if (req.body.password.length < 4) {
        errors.push({text: 'Password length must be at least 4 characters'});
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name: req.body.name,
            email: req.body.email,
            password: '',
            cPassword: ''
        });
    } else {
        User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                req.flash('error', 'Email already used');
                res.redirect('/users/register');
            } else {
                 const newUser = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then((user) => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                    });
                });
            }
        })
    }
});

router.get('/profile/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.findOne({_id: req.params.id})
        .then(currentUser => {
            if (!currentUser) {
                req.flash('error_msg', 'User not found');
                res.redirect('/');
            } else {
                Question.find({askedBy: currentUser.id})
                .then(currentUserQuestions => {
                    res.render('users/profile', {
                        currentUser: currentUser,
                        currentUserQuestions: currentUserQuestions
                    });
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log('Error', err));
    } else {
        res.redirect('/');
    }
});

module.exports = router;