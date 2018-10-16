const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
const Question = require('../models/Question');

router.get('/:id', ensureAuthenticated, (req, res) => {
    Question.findOne({_id: req.params.id})
    .populate('answers.answeredBy')
    .then(question => {
        res.render('answers/add', {
            question: question,
        });
    })
    .catch(err => console.log('error while fetching question...', err));
});

router.post('/:id', ensureAuthenticated, (req, res) => {
    Question.findOne({_id: req.params.id})
    .then(question => {

        const newAnswer = {
            answeredBy: req.user.id,
            body: req.body.answer,
        };

        question.isAnswered = true;
        question.answers.unshift(newAnswer);

        question.save()
        .then(question => {
            res.redirect('/');
        })
    })
});


router.get('/', (req, res) => {
    Question.find({isAnswered: true})
    .then(answers => {
        console.log(answers);
        res.render('answers/index', {
            answers: answers
        });
    })
});

router.post('/', (req, res) => {
    if (!req.body.answer || req.body.answer.length < 10) {
        req.flash('error_msg', 'Please add minimum 10 chars answer');
        res.redirect('back');
    } else {
        const newAnswer = new Answer({
            answer: req.body.answer,
            answeredBy: req.user.id
        })
        .save()
        .then(answer => {
            req.flash('success_msg', 'Your answer has been added successfuly');
            res.redirect('/answers');
        })
        .catch(err => console.log(err));
    }
});

module.exports = router;