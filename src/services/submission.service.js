const Submission = require('../models/submission.model');
const Assignment = require('../models/assignment.model');

const submitAssignment = async (data, studentId) => {
    // ১. অ্যাসাইনমেন্ট খুঁজে বের করা (ডেডলাইন চেক করার জন্য)
    const assignment = await Assignment.findById(data.assignment);
    if (!assignment) {
        throw new Error('Assignment not found');
    }

    // ২. ডেডলাইন চেক করা
    const currentDate = new Date();
    if (currentDate > assignment.deadline) {
        throw new Error('The deadline for this assignment has passed');
    }

    // ৩. ডুপ্লিকেট সাবমিশন চেক করা
    const alreadySubmitted = await Submission.findOne({ 
        assignment: data.assignment, 
        student: studentId 
    });

    if (alreadySubmitted) {
        throw new Error('You have already submitted this assignment');
    }

    const submission = await Submission.create({
        ...data,
        student: studentId
    });
    return submission;
};

const getMySubmissions = async (studentId) => {
    return await Submission.find({ student: studentId })
        .populate('assignment', 'title difficulty deadline');
};

const getSubmissionsByAssignment = async (assignmentId, instructorId) => {
    // শুধু ওই ইনস্ট্রাক্টরই সাবমিশন দেখতে পারবেন যিনি অ্যাসাইনমেন্টটি তৈরি করেছেন (অ্যাডভান্সড সিকিউরিটি)
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment || assignment.createdBy.toString() !== instructorId.toString()) {
        throw new Error('You are not authorized to view submissions for this assignment');
    }

    return await Submission.find({ assignment: assignmentId })
        .populate('student', 'name email');
};

const reviewSubmission = async (id, reviewData, instructorId) => {
    const submission = await Submission.findById(id).populate('assignment');
    
    if (!submission) {
        throw new Error('Submission not found');
    }

    // ৪. ইনস্ট্রাক্টর ওনারশিপ চেক
    // চেক করা হচ্ছে—যে ইনস্ট্রাক্টর রিভিউ দিচ্ছেন, তিনি কি এই অ্যাসাইনমেন্টের মালিক?
    if (submission.assignment.createdBy.toString() !== instructorId.toString()) {
        throw new Error('You are not authorized to review this submission');
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
        id, 
        {
            status: reviewData.status,
            feedback: reviewData.feedback
        },
        { new: true, runValidators: true }
    );

    return updatedSubmission;
};

module.exports = {
    submitAssignment,
    getMySubmissions,
    getSubmissionsByAssignment,
    reviewSubmission
};
