const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required!!'],
    max: 100,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!!'],
    max: 100,
  },
  //   address: {
  //     type: String,
  //     required: true
  //   },
  //   phone: {
  //     type: Number,
  //     required: true
  //   },
  //   photo: {
  //     type: String,
  //     required: true
  //   },
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
  //   ,
  //   been_helped: {
  //     type: Number,
  //     required: false
  //   },
  //   helped_others: {
  //     type: Number,
  //     required: false
  //   }
});

module.exports = mongoose.model('User', userSchema);
