const express = require('express');

const router = express.Router();
const commentController = require('../controllers/comment');

router.post('/', commentController.getAllComments);
router.post('/add', commentController.addComment);
router.post('/update', commentController.updateComment);
router.post('/delete', commentController.deleteComment);

module.exports = router;