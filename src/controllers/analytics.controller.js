const analyticsService = require('../services/analytics.service');

const getInstructorStats = async (req, res) => {
    try {
        const result = await analyticsService.getInstructorStats(req.user._id);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getStudentStats = async (req, res) => {
    try {
        const result = await analyticsService.getStudentStats(req.user._id);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getInstructorStats,
    getStudentStats
};
