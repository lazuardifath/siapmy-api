const express = require('express');

const router = express.Router();
const consultationController = require('../controllers/consultation');

router.post('/user', consultationController.getAllUserConsultation);
router.post('/consultant',consultationController.getAllConsultantConsultation);
router.post('/add', consultationController.addConsultation);
router.post('/done', consultationController.doneStatus);
router.post('/delete', consultationController.deleteConsultation);

module.exports = router;