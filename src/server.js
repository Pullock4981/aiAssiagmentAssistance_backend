const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Function to start server after DB connection
const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();
        
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err, promise) => {
            console.log(`❌ Error: ${err.message}`);
            server.close(() => process.exit(1));
        });
    } catch (error) {
        console.error(`❌ DB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

startServer();
