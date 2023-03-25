var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const validateToken = require('../../middleware/validateToken');
const { userValidationSchema } = require('../../middleware/joiValidation');
const { loginValidationSchema } = require('../../middleware/joiValidation');



// import the User model
const User = require('../../models/user');
const Login = require('../../models/login');

/* GET users listing. */
router.get('/', validateToken, function (req, res) {
  // res.send('respond with a resource');

  User.find({}, (err, users) => {
    //handle if err occurred
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    }
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
    res.send(oneUser);
  });
});

// Update user description
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
    },
    (err, data) => {
      if (err) {
        return res.status(401).send(err);
      }
      if (!data) {
        res.status(404).send();
      }
      res.status(204).send('User description updated');
    }
  );
});

/* POST user data*/
router.post('/register', (req, res) => {
  console.log(req.body);
  //create an instance of the Login model
  const signin = new User(req.body);
  const signinObject = signin.toObject();
  //execute the validate method...

  const { error, value } = userValidationSchema.validate(signinObject);
  if (error) {
    return res.status(422).send(error.details[0].message);
  } else {

    // get the email from the body of the request
    // query the db with User model to see if a document already exists
    // with the submitted email
    User.findOne({ email: value.email }, (err, users) => {
      //handle if err occurred
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred');
      }

      // if exist...respond with 400 and in the response send back message that
      // user already exists.
      if (users !== null) {
        return res.status(400).send('User already exists');
      }

      // replace the req,body.password value with the hashed equivalent
      bcrypt.hash(value.password, 10, (err, hash) => {
        value.password = hash;
        // console.log(req.body.picture);

        // Use the user model to insert a new record.
        // may have a validation error
        User.create(value, (err, savedUser) => {
          if (err) {
            return res.status(400).send(`Error: ${err.message}`);
          }
          // If the user was successfully created.
          // generate a json web token send a response back to the client
          const token = jwt.sign(
            {
              userId: savedUser._id.toString(),
              email: value.email,
            },
            process.env.JWT_SECRET_KEY
          );

          res.set('x-auth-token', token);

          res.status(201).send({
            email: value.email,
            password: value.password,
          });
        });
      });
    });

  }
});

router.post('/login', (req, res) => {
  //create an instance of the Login model

  const login = new Login(req.body);
  const loginObject = login.toObject();
  //execute the validate method...

  const { error, value } = loginValidationSchema.validate(loginObject);
  if (error) {
    return res.status(422).send(error.details[0].message);
  } else {

    // sample req.body could be { email: "joe@foo.com", password: "letmein" }
    // query the database using the User model to see
    User.findOne({ email: value.email }, (err, user) => {
      //handle if err occurred
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred');
      }

      // if there is a user with the provided email
      // if there is no returned user....respond with unauthorized response (401)
      if (user === null) {
        return res.status(401).send('No user exists');
      }

      // if there is a user....compare the submitted password with the user's password hash
      bcrypt.compare(value.password, user.password, (err, result) => {
        if (!result) {
          // if there is no match....respond with unauthorized response (401)
          // if there is a match....create a jwt send back in the response.
          return res.status(404).send('Unauthorized response');
        }
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: value.email,
          },
          process.env.JWT_SECRET_KEY
        );

        res.set('x-auth-token', token);
        res.send('Login success!!');
      });
      // res.send('login');
    });
  }
});

module.exports = router;
