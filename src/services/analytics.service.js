const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const mongoose = require('mongoose');

const getInstructorStats = async (instructorId) => {
    // ১. ইনস্ট্রাক্টরের মোট অ্যাসাইনমেন্ট সংখ্যা
    const totalAssignments = await Assignment.countDocuments({ createdBy: instructorId });

    // ২. ডিফিকাল্টি অনুযায়ী অ্যাসাইনমেন্ট ডিস্ট্রিবিউশন (For Bar Chart)
    const difficultyStats = await Assignment.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(instructorId) } },
        { $group: { _id: "$difficulty", count: { $sum: 1 } } }
    ]);

    // ৩. ইনস্ট্রাক্টরের সব অ্যাসাইনমেন্টের সাবমিশন স্ট্যাটাস (For Pie Chart)
    // প্রথমে এই ইনস্ট্রাক্টরের সব অ্যাসাইনমেন্ট আইডি খুঁজে বের করা
    const instructorAssignments = await Assignment.find({ createdBy: instructorId }).select('_id');
    const assignmentIds = instructorAssignments.map(a => a._id);

    const submissionStats = await Submission.aggregate([
        { $match: { assignment: { $in: assignmentIds } } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    return {
        totalAssignments,
        difficultyStats,
        submissionStats
    };
};

const getStudentStats = async (studentId) => {
    // ১. স্টুডেন্টের মোট সাবমিশন সংখ্যা
    const totalSubmissions = await Submission.countDocuments({ student: studentId });

    // ২. স্টুডেন্টের নিজের সাবমিশন স্ট্যাটাস ডিস্ট্রিবিউশন
    const submissionStats = await Submission.aggregate([
        { $match: { student: new mongoose.Types.ObjectId(studentId) } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    return {
        totalSubmissions,
        submissionStats
    };
};

module.exports = {
    getInstructorStats,
    getStudentStats
};
