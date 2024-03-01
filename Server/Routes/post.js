const express = require('express');
const router = express.Router();

const postController = require('../Controllers/post');

/* GET: default route */
router.get('/', (req, res, next) => {
    postController.index(req, res, next);
});

/* GET: /post/create => display blank form */
router.get('/create', (req, res, next) => {
    postController.displayCreateForm(req, res, next);
});

/* POST: /post/create => process form submission for creating */
router.post('/create', (req, res, next) => {
    postController.createPost(req, res, next);
});

/* GET: /post/delete/abc123 => delete selected post doc */
router.get('/delete/:_id', (req, res, next) => {
    postController.deletePost(req, res, next);
});

/* GET: /post/edit/abc123 => display blank form */
router.get('/edit/:_id', (req, res, next) => {
    postController.displayEditForm(req, res, next);
});

/* POST: /post/edit/abc123 => process form submission for updating */
router.post('/edit/:_id', (req, res, next) => {
    postController.updatePost(req, res, next);
});

module.exports = router;