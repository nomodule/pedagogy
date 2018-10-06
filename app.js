const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

/*_____________________________________________*/

// static files
app.use(express.static('public'))

// express handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// import and use routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

/*_____________________________________________*/

const PORT = 3001;
app.listen(PORT, (req, res) => {
    console.log(`Server started listening at port ${PORT}...`);
});