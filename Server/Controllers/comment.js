// Import the Comment model
const Comment = require('../Models/comment');
const Post = require('../Models/post');

// Controller method to create a new comment
const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params.postId;
        // const { comment, username } = req.body;

        // Create a new comment instance
        const newComment = new Comment({
            content: req.body.comment,

            post: req.body.postId
        });

        // Save the new comment to the database
        await newComment.save();

        // Redirect back to the post page after adding the comment
        res.redirect(`/post/`);
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

// Controller method to delete a comment
const deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;

        // Find and delete the comment by its ID
        await Comment.findByIdAndDelete(commentId);

        // Redirect back to the post page after deleting the comment
        res.redirect(`/post/${postId}`);
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

let getComment = async (req, res, next) => {



    // let post = await Post.findById{
    //     req.params.postId
    // }

    res.render('post/comment', { 
        title: 'Add New Comment',
        postId: req.params.postId
    });
}


// Export the controller methods
module.exports = {
    createComment,
    deleteComment,
    getComment
};
