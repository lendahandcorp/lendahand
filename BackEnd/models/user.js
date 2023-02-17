const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
<<<<<<< HEAD
  firstName: {
=======
  name: {
>>>>>>> frontend
    type: String,
    required: [true, 'First name is required!!'],
    max: 100,
  },
<<<<<<< HEAD
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
=======
//   last_name: {
//     type: String,
//     required: [true, 'Last name is required!!'],
//     max: 100,
//   },
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
>>>>>>> frontend
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
<<<<<<< HEAD
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
=======
  }
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
>>>>>>> frontend
