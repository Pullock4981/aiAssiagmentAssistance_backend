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
        // যদি সাবমিশন আগেই 'accepted' হয়ে যায়, তবে আর আপডেট করা যাবে না
        if (alreadySubmitted.status === 'accepted') {
            throw new Error('You have already submitted this assignment and it is approved. No further changes allowed.');
        }
        
        // অন্যথায় স্টুডেন্ট তার আগের সাবমিশন আপডেট করতে পারবে (Re-submit)
        const updated = await Submission.findByIdAndUpdate(alreadySubmitted._id, {
            ...data,
            status: 'pending', // আপডেট করার পর আবার পেন্ডিং করে দাও
            feedback: '' // আগের ফিডব্যাক মুছে দাও
        }, { new: true });
        return updated;
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

const getAllInstructorSubmissions = async (instructorId) => {
    // ১. এই ইনস্ট্রাক্টরের তৈরি করা সব অ্যাসাইনমেন্ট আইডি খুঁজে বের করা
    const assignments = await Assignment.find({ createdBy: instructorId }).select('_id');
    const assignmentIds = assignments.map(a => a._id);

    // ২. ওই অ্যাসাইনমেন্টগুলোর সব সাবমিশন খুঁজে বের করা
    return await Submission.find({ assignment: { $in: assignmentIds } })
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
