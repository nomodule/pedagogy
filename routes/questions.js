const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

const Question = require('../models/Question');

router.get('/add', ensureAuthenticated, (req, res) => {
    if (req.user) {
        req.flash('error_msg', 'Email already used');
        res.render('questions/add');
    } else {
        res.redirect('/users/login');
    }
});

router.post('/add', ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.question) {
        errors.push({text: 'Please add question'});
    }
    if (req.body.subject == '0' || req.body.subject == 0) {
        errors.push({text: 'Please pick a subject'});
    }

    if (errors.length > 0) {
        res.render('questions/add', {
            errors: errors,
            question: req.body.question,
            subject: req.body.subject,
            points: req.body.points
        });
    } else {
        
    }
});

module.exports = router;