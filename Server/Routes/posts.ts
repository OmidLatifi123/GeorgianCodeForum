import express from 'express';
const router = express.Router();

const postsController = require('../Controllers/posts');


router.get('/', (req, res, next) => {
    postsController.index(req, res, next);
});

router.get('/create', (req, res, next) => {
    postsController.displayCreateForm(req, res, next);
});

router.post('/create/add', (req, res, next) => {
    postsController.createProviders(req, res, next);
});

router.get('/edit/:_id', (req, res, next) => {
    postsController.displayEditForm(req, res, next);
});

router.post('/edit/:_id', (req, res, next) => {
    postsController.updatePost(req, res, next);
});

router.get('/delete/:_id', (req, res, next) => {
    postsController.deletePost(req, res, next);
});

export default router;