var jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // import the User model
  const User = require('../models/user');

  // check for existance of a token in the request header (x-auth-token)
  // if it doesn't exist, send response 401 unauthorized
  if (!req.get('x-auth-token')) {
    return res.status(401).send('Access is Denied!!');
  }

  const decode = jwt.verify(
    req.get('x-auth-token'),
    process.env.JWT_SECRET_KEY
  );
  console.log(decode.password);

  // if it does exist, make sure it is valid...if not send 401,
  // otherwise allow request to proceed on

  User.findOne({ email: decode.email }, (err, user) => {
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
  });

  next();
  // TEMPORARY
  // res.send('You reached the validate token middleware')
  // res.send(`The token is ${req.get('x-auth-token')}`)
};

module.exports = validateToken;
