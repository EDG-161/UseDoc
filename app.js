const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

require('./app/routes/notes')(app);
app.use(express.static(__dirname + '/app/public'));
//app.use(express.static(path.join(__dirname, 'app/public')));

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});