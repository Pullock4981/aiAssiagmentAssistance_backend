const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: [true, 'Assignment reference is required']
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Student reference is required']
    },
    submissionUrl: {
        type: String,
        required: [true, 'Submission URL is required'],
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'needs-improvement'],
        default: 'pending'
    },
    feedback: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// একজন স্টুডেন্ট একটি অ্যাসাইনমেন্টে একবারই সাবমিট করতে পারবে (অ্যাডভান্সড লজিক)
submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
