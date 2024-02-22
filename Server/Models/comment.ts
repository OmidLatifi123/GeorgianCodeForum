// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

/* Comment Model */

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, refPath: 'type'},
    date: {type: String},
    likes: Number,
    code: String,
    description: String,
},
{
    collection: 'comment'
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
  