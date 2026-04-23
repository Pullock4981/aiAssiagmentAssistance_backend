const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Assignment title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Assignment description is required']
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Instructor reference is required']
    }
}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
