const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//load in any env variables from our .env file
require('dotenv').config();

//create an instenece of our express app
const app = express();
//Temp Port (can be replaced with the .env port)
const port = 3000;

// connect to MongoDB
mongoose.set("strictQuery", false);
console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
mongoose.connect(process.env.MONGO_DB);

//import the Products model
const users = require('./models/user')

//Temporary test
app.get('/users', (req, res) => {
  // res.send('Hello World!');
  users.find((err, data) => {

    res.json(data)
  })
});

// var indexRouter = require('./routes/index'); //index = index.js
// var apiRouter = require('./routes/api/api');  //api = api folder

app.listen(port, () => {
  console.log(`Server is running. http://localhost:${port}`);
});
