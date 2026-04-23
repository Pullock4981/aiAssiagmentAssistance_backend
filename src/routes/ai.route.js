const express = require('express');
const aiController = require('../controllers/ai.controller');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// ইনস্ট্রাক্টরের জন্য
router.post('/refine-assignment', protect, restrictTo('instructor'), aiController.refineDescription);
router.post('/suggest-feedback', protect, restrictTo('instructor'), aiController.generateFeedback);

// স্টুডেন্টের জন্য
router.post('/improve-notes', protect, restrictTo('student'), aiController.improveNotes);

module.exports = router;
