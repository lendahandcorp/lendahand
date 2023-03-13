const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const reviewSchema = new Schema({
    reviewer: {
        type: String,
        required: [true, 'Id of the person who created the post.']
    },
    personBeingReviewed: {
        type: String,
        required: [true, 'Id of the person who is being reviewed']
    },
    post_id: {
        type: String,
        required: [true, 'Post Id.']
    },
    description: {
        type: String,
        maxlength: 255
    },
    stars: {
        type: Number,
        required: [true, 'Review rating, between 1 and 5'],
        min: [1, 'Must be a value between 1 and 5, inclusive.'],
        max: [5, 'Must be a value between 1 and 5, inclusive.']
    },
    date_created: { type: Date, default: Date.now }
});

// Unique constraint between reviewer, personBeingReviewed and postId
// To avoid duplicated reviews for the same personBeingReviewed
reviewSchema.index({ reviewer:1 , personBeingReviewed: 1 , post_id: 1 },{unique: true})

//generating the model from the schema 
const review = mongoose.model('reviews', reviewSchema);
//export for use elseware
module.exports = review;