let Post = require('../Models/post');
let Comment = require('../Models/comment');

let index = async (req, res, next) => {
        // Fetch all post docs and populate comments
        let post = await Post.find();
        let comment = await Comment.find();
        let user = req.user;

        // Map posts and add editable property
        post = post.map(post => ({
            ...post.toObject(),
            editable: user && user.username === post.username
        }));

        post.forEach(post => {
            if (post._id) {
                // Ensure comments array exists and contains valid comments
                if (Array.isArray(comment) && comment.length > 0) {
                    post.comment = comment.filter(comment => comment.post && comment.post.equals(post._id));
                } else {
                    // Handle empty comments array or invalid comments
                    post.comment = [];
                }
            }
        });

        res.render('post/find', {
            title: 'Find Post',
            post: post,
            user: user,
        });
};

let displayCreateForm = async(req, res, next) => {
    res.render('post/create', { title: 'Add New Post', user: req.user });
};

let createPost = async (req, res, next) => {
    await Post.create(req.body);
    res.redirect('/post');
};

let createComment = async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        const user = req.user; // Assuming the username is stored in the user object

        // Find the post and add the new comment
        const post = await Post.findById(postId);
        if (post) {
            post.comments.push({
                content: comment,
                username: user.username,
                createdAt: new Date()  // Set the current date/time for the comment
            });
            await post.save();  // Save the post with the new comment
            res.redirect('/post');  // Redirect to a suitable URL
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        next(error);
    }
};

let deletePost = async (req, res, next) => {
    await Post.findByIdAndDelete(req.params._id);
    res.redirect('/post');
};

let displayEditForm = async (req, res, next) => {
    let post = await Post.findById(req.params._id);
    res.render('post/edit', { 
        title: 'Update Post',
        post: post,  
        user: req.user
    });
};

let updatePost = async (req, res, next) => {
    await Post.findByIdAndUpdate(req.params._id, req.body);
    res.redirect('/post');
};

// make public
module.exports = {
    index, 
    displayCreateForm, 
    createPost, 
    createComment, // Add the createComment method to the exports
    deletePost, 
    displayEditForm,
    updatePost
};