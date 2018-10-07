const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

/*_____________________________________________*/

// import routes
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const questionsRoute = require('./routes/questions');

// db
require('./config/db');

// express handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// static files
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// golbal variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null
    next();
});

// use routes
app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/questions', questionsRoute);
require('./config/passport')(passport);

/*_____________________________________________*/

const PORT = 3001;
app.listen(PORT, (req, res) => {
    console.log(`Server started listening at port ${PORT}...`);
});