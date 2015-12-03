var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var PASSWORDS_FILE = path.join(__dirname, 'passwords.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  fs.readFile(PASSWORDS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var passwords = JSON.parse(data);
    if (!passwords.hasOwnProperty(email)) {
      res.status(401).json({error: 'Email not found.'});
    } else if (passwords[email] !== password) {
      res.status(401).json({error: 'Incorrect password.'});
    } else {
      res.status(200).json({data: 'Successfully logged in!'});
    }

  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
