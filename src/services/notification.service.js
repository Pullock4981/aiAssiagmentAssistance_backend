const Notification = require('../models/notification.model');

const createNotification = async ({ recipient, type, message, relatedSubmission, relatedAssignment }) => {
    return await Notification.create({ recipient, type, message, relatedSubmission, relatedAssignment });
};

const getNotificationsForUser = async (userId) => {
    return await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .limit(20);
};

const markAllAsRead = async (userId) => {
    return await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
};

const markOneAsRead = async (notificationId, userId) => {
    return await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId },
        { isRead: true },
        { new: true }
    );
};

const getUnreadCount = async (userId) => {
    return await Notification.countDocuments({ recipient: userId, isRead: false });
};

module.exports = { createNotification, getNotificationsForUser, markAllAsRead, markOneAsRead, getUnreadCount };
