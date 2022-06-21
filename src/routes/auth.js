const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.post('/add-user', authController.addUser);
router.post('/add-admin', authController.addAdmin);
router.post('/check-email', authController.checkEmail);
router.post('/login', authController.login);
router.post('/get-user-data', authController.getUserData);

module.exports = router;