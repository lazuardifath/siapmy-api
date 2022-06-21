const express = require('express');

const router = express.Router();
const quoteController = require('../controllers/quote');

router.post('/', quoteController.getAllQuotes);
router.post('/user', quoteController.getAllUserQuotes);
router.post('/get-by-id',quoteController.getQuoteById);
router.post('/add', quoteController.addQuote);
router.post('/confirm', quoteController.confirmQuote);
router.post('/delete',quoteController.deleteQuote);

module.exports = router;