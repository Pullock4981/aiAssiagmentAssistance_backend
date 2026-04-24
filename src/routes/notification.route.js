const express = require('express');
const notificationController = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, notificationController.getMyNotifications);
router.get('/unread-count', protect, notificationController.getUnreadCount);
router.patch('/mark-all-read', protect, notificationController.markAllAsRead);
router.patch('/:id/read', protect, notificationController.markOneAsRead);

module.exports = router;
