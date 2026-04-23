const assignmentService = require('../services/assignment.service');

const createAssignment = async (req, res) => {
    try {
        const result = await assignmentService.createAssignment(req.body, req.user._id);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllAssignments = async (req, res) => {
    try {
        const result = await assignmentService.getAllAssignments();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getSingleAssignment = async (req, res) => {
    try {
        const result = await assignmentService.getAssignmentById(req.params.id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const result = await assignmentService.updateAssignment(req.params.id, req.body, req.user._id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const result = await assignmentService.deleteAssignment(req.params.id, req.user._id);
        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createAssignment, getAllAssignments, getSingleAssignment, updateAssignment, deleteAssignment };
