var express = require('express');
var router = express.Router();

// import the User model
const User = require('../../models/user');

/* GET users listing. */
router.get('/', function (req, res) {
  // res.send('respond with a resource');

  User.find({}, (err, users) => {
    //handle if err occurred
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    }

    console.log(users);
    res.send(users);
  });
});

module.exports = router;
