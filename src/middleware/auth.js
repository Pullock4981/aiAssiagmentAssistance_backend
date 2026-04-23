const jwt = require('jsonwebtoken');
const User = require('../app/modules/user/user.model');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // টোকেনটি রিকোয়েস্ট হেডার থেকে নেওয়া
            token = req.headers.authorization.split(' ')[1];

            // টোকেন ভেরিফাই করা
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // ইউজারের তথ্য রিকোয়েস্ট অবজেক্টে সেট করা (পাসওয়ার্ড ছাড়া)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }
};

// রোল চেক করার মিডলওয়্যার (যেমন: শুধু ইনস্ট্রাক্টর ঢুকতে পারবে)
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};

module.exports = {
    protect,
    restrictTo
};
