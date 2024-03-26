// post model for CRUD
let Post = require('../Models/post');

let index = async (req, res, next) => {
    // fetch all post docs 
    let post = await Post.find();

    // console.log(post);
    res.render('post/find', { 
        title: 'Find Post',
        post: post
    });
};

let displayCreateForm = async(req, res, next) => {


    res.render('post/create', { title: 'Add New Post' });

};

let createPost = async (req, res, next) => {
    // save new post to DB
    await Post.create(req.body);

    // redirect
    res.redirect('/post');
};

let deletePost = async (req, res, next) => {
    // remove selected doc
    await Post.findByIdAndDelete(req.params._id);
    // await post.deleteOne({ _id: req.params._id }); - this works too

    // redirect
    res.redirect('/post');
};

let displayEditForm = async (req, res, next) => {
    let post = await Post.findById(req.params._id);

    res.render('post/edit', { 
        title: 'Update Post',
        post: post,
    });
};

let updatePost = async (req, res, next) => {
    await Post.findByIdAndUpdate(req.params._id, req.body);

    res.redirect('/post');
};

// make public
module.exports = {
    index, displayCreateForm, createPost, deletePost, displayEditForm,
    updatePost
};