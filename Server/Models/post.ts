// Omid Latifi, Carlos DaSilva, Christian Schoenwiese, Tristan Schwekendiek
//     1199455, 1191123, 1186384 , 1207799

/* Post Model */

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    likes: Number,
    code: String,
    description: String,
    language: String
},
{
    collection: 'post'
})

const Post = mongoose.model('Post', postSchema);

export default Post;
  