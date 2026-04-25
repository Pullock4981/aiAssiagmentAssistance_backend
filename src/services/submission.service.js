const Submission = require('../models/submission.model');
const Assignment = require('../models/assignment.model');
const { createNotification } = require('./notification.service');

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

    let submission;

    if (alreadySubmitted) {
        // যদি সাবমিশন আগেই 'accepted' হয়ে যায়, তবে আর আপডেট করা যাবে না
        if (alreadySubmitted.status === 'accepted') {
            throw new Error('You have already submitted this assignment and it is approved. No further changes allowed.');
        }
        
        // অন্যথায় স্টুডেন্ট তার আগের সাবমিশন আপডেট করতে পারবে (Re-submit)
        submission = await Submission.findByIdAndUpdate(alreadySubmitted._id, {
            ...data,
            status: 'pending',
            feedback: ''
        }, { new: true });
    } else {
        submission = await Submission.create({ ...data, student: studentId });
    }

    // ৪. সব ইনস্ট্রাক্টরকে নোটিফিকেশন পাঠানো (Global Instructor Model)
    try {
        const instructors = await User.find({ role: 'instructor' }).select('_id');
        const notifications = instructors.map(instructor => createNotification({
            recipient: instructor._id,
            type: 'new_submission',
            message: `🆕 New submission for "${assignment.title}". Review it now.`,
            relatedSubmission: submission._id,
            relatedAssignment: assignment._id,
        }));
        await Promise.all(notifications);
    } catch (notifErr) {
        console.error('Submission notification failed (non-blocking):', notifErr.message);
    }

    return submission;
};

const getMySubmissions = async (studentId) => {
    return await Submission.find({ student: studentId })
        .populate('assignment', 'title difficulty deadline');
};

const getSubmissionsByAssignment = async (assignmentId, instructorId) => {
    return await Submission.find({ assignment: assignmentId })
        .populate('student', 'name email');
};

const reviewSubmission = async (id, reviewData, instructorId) => {
    const submission = await Submission.findById(id).populate('assignment');
    
    if (!submission) {
        throw new Error('Submission not found');
    }

    // reviewed by any instructor

    const updatedSubmission = await Submission.findByIdAndUpdate(
        id, 
        { status: reviewData.status, feedback: reviewData.feedback },
        { new: true, runValidators: true }
    );

    // স্টুডেন্টকে নোটিফিকেশন পাঠানো
    try {
        const statusLabel = 
            reviewData.status === 'accepted' ? '✅ Accepted' :
            reviewData.status === 'needs-improvement' ? '⚠️ Needs Improvement' :
            '🕐 Pending';

        await createNotification({
            recipient: submission.student,
            type: 'status_changed',
            message: `Your submission for "${submission.assignment.title}" has been updated to: ${statusLabel}.`,
            relatedSubmission: submission._id,
            relatedAssignment: submission.assignment._id,
        });
    } catch (notifErr) {
        console.error('Notification creation failed (non-blocking):', notifErr.message);
    }

    return updatedSubmission;
};

const getAllInstructorSubmissions = async (instructorId) => {
    return await Submission.find()
        .populate('student', 'name email')
        .populate('assignment', 'title');
};

module.exports = {
    submitAssignment,
    getMySubmissions,
    getSubmissionsByAssignment,
    reviewSubmission,
    getAllInstructorSubmissions
};
