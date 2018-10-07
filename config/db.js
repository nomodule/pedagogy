const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pedagoggy-dev', {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));