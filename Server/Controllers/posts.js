let Posts = require('../Models/posts');

let index = async (req, res, next) => {
    let posts = await Posts.find();

    res.render('/find', { 
        posts: posts
    });
};

let displayCreateForm = (req, res, next) => {
    res.render('/create');
};

let createPosts = async (req, res, next) => {
    await Posts.create(req.body);

    res.redirect('/find');
};

let displayEditForm = async (req, res, next) => {
    let posts = await Posts.findById(req.params._id);

    res.render('/edit', { 
        posts: posts
    });
};

let updatePosts = async (req, res, next) => {
    await Posts.findByIdAndUpdate(req.params._id, req.body);
    res.redirect('/find');
};

let deletePost = async (req, res, next) => {
    await Posts.findByIdAndDelete(req.params._id);
    res.redirect('/find');
};

module.exports = {
    index, displayCreateForm, createPosts, displayEditForm,
    updatePosts,deletePost
};