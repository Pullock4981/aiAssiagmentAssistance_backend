const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    error.message = err.message;

    // ১. Mongoose Duplicate Key Error
    if (err.code === 11000) {
        error.message = 'User with this email already exists. Please use another email.';
        error.statusCode = 400;
    }

    // ২. Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors || {}).map(val => val.message);
        error.message = `Invalid input data: ${messages.join('. ')}`;
        error.statusCode = 400;
    }

    // ৩. JWT Token Errors
    if (err.name === 'JsonWebTokenError') {
        error.message = 'Invalid token. Please log in again';
        error.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
        error.message = 'Your token has expired. Please log in again';
        error.statusCode = 401;
    }

    // Final response
    res.status(error.statusCode || 500).json({
        success: false,
        status: error.status,
        message: error.message || 'Something went wrong on the server',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = globalErrorHandler;
