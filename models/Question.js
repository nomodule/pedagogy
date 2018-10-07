const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    points: {
        type: Number,
        require: true
    }
});

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;