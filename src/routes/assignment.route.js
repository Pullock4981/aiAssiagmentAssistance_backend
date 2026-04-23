const express = require('express');
const assignmentController = require('../controllers/assignment.controller');
const { protect, restrictTo } = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .get(protect, assignmentController.getAllAssignments)
    .post(protect, restrictTo('instructor'), assignmentController.createAssignment);

router.route('/:id')
    .get(protect, assignmentController.getSingleAssignment)
    .patch(protect, restrictTo('instructor'), assignmentController.updateAssignment)
    .delete(protect, restrictTo('instructor'), assignmentController.deleteAssignment);

module.exports = router;
