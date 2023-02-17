var express = require('express');
var router = express.Router();
// var validateToken = require('../../middleware/validateToken')

// DEFINE ANY SUB-ROUTERS OF OUR API
// USERS
var usersRouter = require('./users');
router.use('/users', usersRouter);

// OUR WELCOME ENDPOINT
router.get('/', (req, res) => {
  // res.header("custom-header", "foo")
  res.send('Welcome to our API!!! :)');
});

module.exports = router;