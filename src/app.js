const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.route');
const assignmentRoutes = require('./routes/assignment.route');
const submissionRoutes = require('./routes/submission.route');

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Learner Analytics Platform API',
        author: 'Technical Instructor Assessment'
    });
});

// 404 Route handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Not Found - ${req.originalUrl}`
    });
});

module.exports = app;
