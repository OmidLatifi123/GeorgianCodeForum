// Omid Latifi
//     1199455

/* Post Model */

const mongoose = require('mongoose');

let postSchema = new mongoose.Schema ({

    postTitle: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    codingLanguage: {
        type: String
    },
    postCode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now 
      },
      username: {
        type: String
    }, comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    // ,
    // file: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'File'
    // }
});

let Post = mongoose.model('Post', postSchema);
module.exports = Post;