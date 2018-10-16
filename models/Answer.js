const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answer: {
        type: String,
        require: true
    },
    answeredBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Answer = mongoose.model('answers', AnswerSchema);

module.exports = Answer;