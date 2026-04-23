const express = require('express');
const submissionController = require('../controllers/submission.controller');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// স্টুডেন্টদের জন্য রুট
router.post('/', protect, restrictTo('student'), submissionController.submitAssignment);
router.get('/my-submissions', protect, restrictTo('student'), submissionController.getMySubmissions);

// ইনস্ট্রাক্টরদের জন্য রুট
router.get('/assignment/:assignmentId', protect, restrictTo('instructor'), submissionController.getSubmissionsByAssignment);
router.patch('/:id/review', protect, restrictTo('instructor'), submissionController.reviewSubmission);

module.exports = router;
