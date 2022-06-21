const express = require('express');

const router = express.Router();
const meditationController = require('../controllers/meditation');

router.post('/', meditationController.getAllMeditation);
router.post('/user', meditationController.getAllUserMeditation);
router.post('/user/get-by-id',meditationController.getUserMeditationById);
router.post('/steps',meditationController.getAllMeditationStep);
router.post('/add', meditationController.addMeditation);
router.post('/steps/add', meditationController.addMeditationStep);
router.post('/user/add', meditationController.addUserMeditation);
router.post('/steps/change', meditationController.changeMeditationStep);
router.post('/delete', meditationController.deleteMeditation);
router.post('/user/delete', meditationController.deleteUserMeditation);

module.exports = router;