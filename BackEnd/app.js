const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./db/db')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//load in any env variables from our .env file
require('dotenv').config();

//create an instenece of our express app
const app = express();
//Temp Port (can be replaced with the .env port)
// const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// connect to MongoDB
mongoDB = db.getDb(process.env.MONGO_DB)
// mongoose.set('strictQuery', false);
// console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
// mongoose.connect(process.env.MONGO_DB);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import routers
var indexRouter = require('./routes/index'); //index = index.js
var apiRouter = require('./routes/api'); //api = api folder

// direct the incoming request to a particular router
// based on the url path
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running. http://localhost:${process.env.PORT}`);
});

module.exports = app;

// //import the Products model
// const users = require('./models/user');

// app.get('/', (req, res) => {
//   res.send('INFT3000 Capstone - Lendahand');
// });

// //Temporary test
// app.get('/users', (req, res) => {
//   // res.send('Hello World!');
//   users.find((err, data) => {
//     res.json(data);
//   });
// });