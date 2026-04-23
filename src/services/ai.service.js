const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ১. অ্যাসাইনমেন্ট ডেসক্রিপশন রিফাইন করা
const refineAssignment = async (content) => {
    const prompt = `You are a professional Technical Instructor at Programming Hero. 
    Refine the following assignment description to make it more professional, 
    clear, and encouraging for students. Add structured task lists if necessary. 
    Content: ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

// ২. অটো ফিডব্যাক জেনারেট করা
const generateFeedback = async (assignmentContent, studentNotes) => {
    const prompt = `As a Technical Instructor, review this student submission.
    Assignment: ${assignmentContent}
    Student's Notes: ${studentNotes}
    Suggest a constructive and motivating feedback (max 3-4 sentences). 
    Help the instructor with a draft feedback.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

// ৩. স্টুডেন্টের নোট সুন্দর করা
const improveStudentNotes = async (notes) => {
    const prompt = `Improve the following student submission notes to be more 
    professional and descriptive. Keep it concise but formal. 
    Notes: ${notes}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

module.exports = {
    refineAssignment,
    generateFeedback,
    improveStudentNotes
};
