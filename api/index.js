const app = require('../src/app');
const connectDB = require('../src/config/db');
const dotenv = require('dotenv');

dotenv.config();

// Connect to Database (Vercel will reuse the connection if possible)
connectDB();

module.exports = app;
