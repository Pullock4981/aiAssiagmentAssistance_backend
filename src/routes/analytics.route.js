const express = require('express');
const analyticsController = require('../controllers/analytics.controller');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.get('/instructor', protect, restrictTo('instructor'), analyticsController.getInstructorStats);
router.get('/student', protect, restrictTo('student'), analyticsController.getStudentStats);

module.exports = router;
