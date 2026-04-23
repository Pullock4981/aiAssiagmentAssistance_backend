const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // ১. Mongoose Duplicate Key Error (ইউজার আগে থেকেই থাকলে)
    if (err.code === 11000) {
        err.message = 'Duplicate field value entered. Please use another value';
        err.statusCode = 400;
    }

    // ২. Mongoose Validation Error (যেমন: পাসওয়ার্ড প্যাটার্ন না মিললে)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        err.message = `Invalid input data: ${messages.join('. ')}`;
        err.statusCode = 400;
    }

    // ৩. JWT Token Errors
    if (err.name === 'JsonWebTokenError') {
        err.message = 'Invalid token. Please log in again';
        err.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
        err.message = 'Your token has expired. Please log in again';
        err.statusCode = 401;
    }

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = globalErrorHandler;
