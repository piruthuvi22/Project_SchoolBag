const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const ejs = require('ejs');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const moment = require('moment');

// Piruthuvi's Code
const bodyParser = require('body-parser');
const path = require('path');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


// Piruthuvi's Code
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Server static files
app.use(express.static(__dirname + '/app/public'));


// app.use(expressLayouts);

require('./config/passport')(passport);

app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs');
const port = process.env.PORT || 8000;
//============================/////


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//=======================//
app.use('/app',  express.static(__dirname +'/app'));

mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, database) => {
 if (err) return console.log(err)
 require('./app/routes')(app, database);




 app.listen(port, () => {
   console.log('We are live on ' + port);
 });
})
