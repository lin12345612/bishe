// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html',require('ejs').renderFile);  //设置模板
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(history())
app.use('/', indexRouter);


module.exports = app;
