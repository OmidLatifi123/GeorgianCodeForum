

const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema ({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    username: {
        type: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;