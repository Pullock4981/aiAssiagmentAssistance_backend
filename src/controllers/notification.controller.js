const notificationService = require('../services/notification.service');

const getMyNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsForUser(req.user._id);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const count = await notificationService.getUnreadCount(req.user._id);
        res.status(200).json({ success: true, count });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await notificationService.markAllAsRead(req.user._id);
        res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const markOneAsRead = async (req, res) => {
    try {
        const notification = await notificationService.markOneAsRead(req.params.id, req.user._id);
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getMyNotifications, getUnreadCount, markAllAsRead, markOneAsRead };
