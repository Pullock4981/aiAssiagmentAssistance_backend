const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['new_submission', 'status_changed'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    relatedSubmission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    },
    relatedAssignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
