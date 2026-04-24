const submissionService = require('../services/submission.service');

const submitAssignment = async (req, res) => {
    try {
        const result = await submissionService.submitAssignment(req.body, req.user._id);
        res.status(201).json({ success: true, message: 'Assignment submitted successfully', data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMySubmissions = async (req, res) => {
    try {
        const result = await submissionService.getMySubmissions(req.user._id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getSubmissionsByAssignment = async (req, res) => {
    try {
        const result = await submissionService.getSubmissionsByAssignment(req.params.assignmentId, req.user._id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

const reviewSubmission = async (req, res) => {
    try {
        const result = await submissionService.reviewSubmission(req.params.id, req.body, req.user._id);
        res.status(200).json({ success: true, message: 'Submission reviewed successfully', data: result });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

const getAllInstructorSubmissions = async (req, res) => {
    try {
        const result = await submissionService.getAllInstructorSubmissions(req.user._id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { 
    submitAssignment, 
    getMySubmissions, 
    getSubmissionsByAssignment, 
    reviewSubmission, 
    getAllInstructorSubmissions 
};
