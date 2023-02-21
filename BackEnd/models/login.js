const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email address is required!!'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required!!'],
    max: 255,
  },
});

module.exports = mongoose.model('Login', loginSchema);
