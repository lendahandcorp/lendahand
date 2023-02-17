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

// GET ONE USER BY ID
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, oneUser) => {
    if (err) {
      return res.status(400).send(`Error: ${err.message}`);
    }

    if (!oneUser) {
      return res.status(404).send();
    }
    console.log(oneUser);
    res.send(oneUser);
  });
});

module.exports = router;