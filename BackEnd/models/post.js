const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product Name Required!!!']
    },
    body: {
        type: String,
        required: [true, 'Description Required!!!']
    },
    //"int(ObjectId?)" Needed to be explained for tags data type
    //I set it to Number temporary
    //resource found: 
    //https://stackoverflow.com/questions/8111846/how-to-set-objectid-as-a-data-type-in-mongoose
    tags: {
        type: Array, "default": [],
        required: [true, 'Tags Required!!!']
    },
    availability: {
        type: Date, default: Date.now,
        required: [true, 'Availability Date Required!!!']
    },
    date_created: { type: Date, default: Date.now },
    status_id: { type: Number,
        required: [true, 'Status Required!!!'] },
    reviews: { type: Array, "default": [] },
    location: {
        type: String,
        required: [true, 'Location Required!!!']
    },
    people_needed: {
        type: Number,
        required: [true, 'The Number of People needed is Required!!!']
    },
    people_accepted: {
        type: Array, "default": [],
        required: false
    }
}, { collection: 'posts' });

//generating the model from the schema 
const post = mongoose.model('posts', postSchema);
//export for use elseware
module.exports = post;