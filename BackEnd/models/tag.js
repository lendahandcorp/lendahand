const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    match: [
      /^[a-zA-Z]*$/,
      'Tags must contain only letters and no spaces or symbols',
    ],
    required: [true, 'Tag is required!'],
    minlength: 2,
    maxlength: 100,
  },
  date_created: {
    type: Date,
    default: Date.now,
  }
});
// Export model
module.exports = {
    Tag: mongoose.model("Tag", TagSchema),
  }