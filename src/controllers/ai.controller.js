const aiService = require('../services/ai.service');

const refineDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const refined = await aiService.refineAssignment(description);
        res.status(200).json({ success: true, data: refined });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const generateFeedback = async (req, res) => {
    try {
        const { assignmentContent, studentNotes } = req.body;
        const feedback = await aiService.generateFeedback(assignmentContent, studentNotes);
        res.status(200).json({ success: true, data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const improveNotes = async (req, res) => {
    try {
        const { notes } = req.body;
        const improvedNotes = await aiService.improveStudentNotes(notes);
        res.status(200).json({ success: true, data: improvedNotes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { refineDescription, generateFeedback, improveNotes };
