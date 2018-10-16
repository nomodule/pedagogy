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
    },
    askedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAnswered: false,
    answers: [{
        answeredBy: {
            type: Schema.Types.ObjectId,
            require: true
        },
        body: {
            type: String,
            require: true
        },
        answeredOn: {
            type: Date,
            default: Date.now
        }
    }]
});

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;