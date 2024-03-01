const mongoose = require('mongoose');

// define schema for Media object
let mediaSchema = new mongoose.Schema({
    type: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    provider: {
        type: String
    },
    status: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    username: {
        type: String
    }
});

let Media = mongoose.model('Media', mediaSchema);
module.exports = Media;