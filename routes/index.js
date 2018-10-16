const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', (req, res) => {
    Question.find({})
    .populate('askedBy')
    .sort({date: 'desc'})
    .then(questions => {
        if (!questions) {
            res.render('index');
        } else {
            res.render('index', {
                questions: questions
            });
        }
    })
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;