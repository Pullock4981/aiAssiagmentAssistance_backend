const Assignment = require('../models/assignment.model');
const User = require('../models/user.model');
const { createNotification } = require('./notification.service');

const createAssignment = async (data, instructorId) => {
    const assignment = await Assignment.create({ ...data, createdBy: instructorId });

    // সব স্টুডেন্টকে নতুন অ্যাসাইনমেন্টের নোটিফিকেশন পাঠানো
    try {
        const students = await User.find({ role: 'student' }).select('_id');
        const notifications = students.map(student => createNotification({
            recipient: student._id,
            type: 'new_assignment',
            message: `📚 New assignment released: "${assignment.title}". Check it out and submit before the deadline!`,
            relatedAssignment: assignment._id,
        }));
        await Promise.all(notifications);
    } catch (notifErr) {
        console.error('Assignment release notification failed (non-blocking):', notifErr.message);
    }

    return assignment;
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
    const updated = await Assignment.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    // স্টুডেন্টদের আপডেট জানানো
    try {
        const students = await User.find({ role: 'student' }).select('_id');
        const notifications = students.map(student => createNotification({
            recipient: student._id,
            type: 'assignment_updated',
            message: `📝 Assignment updated: "${updated.title}". Check for any changes in requirements!`,
            relatedAssignment: updated._id,
        }));
        await Promise.all(notifications);
    } catch (notifErr) {
        console.error('Assignment update notification failed (non-blocking):', notifErr.message);
    }

    return updated;
};

const deleteAssignment = async (id, instructorId) => {
    const assignment = await Assignment.findById(id);
    if (!assignment) throw new Error('Assignment not found');
    await Assignment.findByIdAndDelete(id);
    return { message: 'Assignment deleted' };
};

module.exports = { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment };
