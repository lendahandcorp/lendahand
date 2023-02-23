var express = require('express');
var router = express.Router();
// var validateToken = require('../../middleware/validateToken')

// OUR WELCOME ENDPOINT
router.get('/', (req, res) => {
  // res.header("custom-header", "foo")
  res.send('Welcome to our API!!! :)');
});

// DEFINE ANY SUB-ROUTERS OF OUR API
// USERS
var usersRouter = require('./users');
router.use('/users', usersRouter);

// TAGS
var tagsRouter = require('./tags');
router.use('/tags', tagsRouter);

// POSTS
var tagsRouter = require('./posts');
router.use('/posts', tagsRouter);


module.exports = router;