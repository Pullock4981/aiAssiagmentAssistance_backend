const Assignment = require('../models/assignment.model');

const createAssignment = async (data, instructorId) => {
    return await Assignment.create({ ...data, createdBy: instructorId });
};

const getAllAssignments = async () => {
    return await Assignment.find().populate('createdBy', 'name email');
};

const getAssignmentById = async (id) => {
    const assignment = await Assignment.findById(id).populate('createdBy', 'name email');
    if (!assignment) throw new Error('Assignment not found');
    return assignment;
};

const updateAssignment = async (id, data, instructorId) => {
    const assignment = await Assignment.findById(id);
    if (!assignment) throw new Error('Assignment not found');
    if (assignment.createdBy.toString() !== instructorId.toString()) {
        throw new Error('Not authorized');
    }
    return await Assignment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteAssignment = async (id, instructorId) => {
    const assignment = await Assignment.findById(id);
    if (!assignment) throw new Error('Assignment not found');
    if (assignment.createdBy.toString() !== instructorId.toString()) {
        throw new Error('Not authorized');
    }
    await Assignment.findByIdAndDelete(id);
    return { message: 'Assignment deleted' };
};

module.exports = { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment };
