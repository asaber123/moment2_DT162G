const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const coursesRouter = require('./routes/courses');
const bodyParser = require('body-parser');
const app = express();


//main().catch((err) => console.log(err));

mongoose.connect(
    "mongodb+srv://asaber123:mbhJoP@mycv.rjn8b.mongodb.net/myCV?retryWrites=true&w=majority", () =>console.log("Connected to db")
  );

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Makes sure that if the course rout is called, then the functions gonna run. 
app.use('/courses', coursesRouter);

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
