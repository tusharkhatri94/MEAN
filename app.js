const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_server/models/db');
//var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
const apiRouter=require('./app_api/routes/appointments');
const apiRouter2=require('./app_api/routes/products');
var app = express();

app.use(cors());
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'app_server','views'));
app.use(express.static(path.join(__dirname,'salon_public','build')))
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api',apiRouter);
app.use('/api',apiRouter2);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
