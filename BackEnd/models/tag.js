const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    required: [true, 'Tag title is required!'],
    max: 100,
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