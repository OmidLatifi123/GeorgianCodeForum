// Import the Comment model
const Comment = require('../Models/comment');
const Post = require('../Models/post');


// Controller method to create a new comment
const createComment = async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        const { username } = req.user;  // Assuming the username is available in req.user

        // Create a new comment instance
        const newComment = new Comment({
            content: comment,
            username: username,  // Set the username from the logged-in user
            post: postId
        });

        // Save the new comment to the database
        await newComment.save();

        // Redirect back to the post page after adding the comment
        res.redirect(`/post`);  // Adjust the URL as needed to match your application's routing
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
        res.redirect(`/post/find/${postId}`);  // Make sure this route correctly shows the post
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

let getComment = async (req, res, next) => {
    const { postId } = req.params;

    // Check if the user is logged in
    if (!req.isAuthenticated()) {
        // Redirect to the login page if the user is not authenticated
        return res.redirect('/auth/login');  // Adjust the URL as per your login route
    }

    // Proceed to render the comment form if the user is logged in
    res.render('post/comment', { 
        title: 'Add New Comment',
        postId: postId,
        user: req.user  // Include the user in the rendering context if needed
    });
}

// Export the controller methods
module.exports = {
    createComment,
    deleteComment,
    getComment
};
