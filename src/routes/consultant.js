const express = require('express');

const router = express.Router();
const consultantController = require('../controllers/consultant');

router.post('/', consultantController.getAllConsultant);
router.post('/add', consultantController.addConsultant);
router.post('/get-by-id',consultantController.getConsultantById);
router.post('/confirm', consultantController.confirmConsultant);
router.post('/delete', consultantController.deleteConsultant);

module.exports = router;