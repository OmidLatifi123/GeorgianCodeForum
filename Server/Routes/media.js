const express = require('express');
const router = express.Router();

const mediaController = require('../Controllers/media');

/* GET: default route */
router.get('/', (req, res, next) => {
    mediaController.index(req, res, next);
});

/* GET: /media/create => display blank form */
router.get('/create', (req, res, next) => {
    mediaController.displayCreateForm(req, res, next);
});

/* POST: /media/create => process form submission for creating */
router.post('/create', (req, res, next) => {
    mediaController.createMedia(req, res, next);
});

/* GET: /media/delete/abc123 => delete selected Media doc */
router.get('/delete/:_id', (req, res, next) => {
    mediaController.deleteMedia(req, res, next);
});

/* GET: /media/edit/abc123 => display blank form */
router.get('/edit/:_id', (req, res, next) => {
    mediaController.displayEditForm(req, res, next);
});

/* POST: /media/edit/abc123 => process form submission for updating */
router.post('/edit/:_id', (req, res, next) => {
    mediaController.updateMedia(req, res, next);
});

module.exports = router;