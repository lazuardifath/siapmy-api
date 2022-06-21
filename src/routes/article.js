const express = require('express');

const router = express.Router();
const articleController = require('../controllers/article');

router.post('/', articleController.getAllArticles);
router.post('/add', articleController.addArticle);
router.post('/get-by-id',articleController.getArticleById);
router.post('/confirm', articleController.confirmArticle);
router.post('/delete', articleController.deleteArticle);
router.post('/user', articleController.getAllUserArticles);

module.exports = router;