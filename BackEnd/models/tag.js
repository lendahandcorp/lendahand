const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Tag title is required!!'],
    max: 100,
  },
  date_created: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model('Tag', userSchema);