const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const mongoose = require('mongoose');

const getInstructorStats = async (instructorId) => {
    // ১. মোট অ্যাসাইনমেন্ট সংখ্যা (Global)
    const totalAssignments = await Assignment.countDocuments();

    // ২. ডিফিকাল্টি অনুযায়ী অ্যাসাইনমেন্ট ডিস্ট্রিবিউশন (Global)
    const difficultyStats = await Assignment.aggregate([
        { $group: { _id: "$difficulty", count: { $sum: 1 } } }
    ]);

    // ৩. সব অ্যাসাইনমেন্টের সাবমিশন স্ট্যাটাস (Global)
    const submissionStats = await Submission.aggregate([
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
