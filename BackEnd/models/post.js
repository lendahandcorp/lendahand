const mongoose = require('mongoose');
//destructuring 
const { Schema } = mongoose;

//define the schema
const postSchema = new Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    title: {
        type: String,
        required: [true, 'Post Title Required!!!'],
        maxlength: 100
    },
    body: {
        type: String,
        required: [true, 'Description Required!!!'],
        maxlength: 1024
    },
    tags: {
        type: Array, "default": [],
        required: [true, 'Tags Required!!!']
    },
    availability: {
        type: Date, default: Date.now,
        required: [true, 'Availability Date Required!!!']
    },
    date_created: { type: Date, default: Date.now },
    status: {
        type: String,
        enum : ['Draft','Open','In Progress','Closed'],
        default: 'Draft',
        required: true
    },
    location: {
        type: String,
        required: [true, 'Location Required!!!']
    },
    people_needed: {
        type: Number,
        required: [true, 'The Number of People needed is Required!!!']
    },
    applicants: {
        type: Array, "default": [],
        required: false
    },
    people_accepted: {
        type: Array, "default": [],
        required: false
    },
    media: {
        data: Buffer,
        contentType: String,
        required : [true, 'Media Required!!!']
    }
}, { collection: 'posts' });

//generating the model from the schema 
const post = mongoose.model('posts', postSchema);
//export for use elseware
module.exports = post;