const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const reviewSchema = new Schema({
    reviewer: {
        type: String,
        required: [true, 'Who created this review?']
    },
    post_id: {
        type: String,
        required: [true, 'What post!!?']
    },
    title: {
        type: Number,
        required: [true, 'Title is required!']
    },
    body: {
        type: String,
        required: [true, 'Want more story!!']
    },
    stars: {
        type: Number,
        required: [true, 'Give some starts!']
    },
    date_created: { type: Date, default: Date.now }
});

//generating the model from the schema 
const review = mongoose.model('reviews', reviewSchema);
//export for use elseware
module.exports = review;