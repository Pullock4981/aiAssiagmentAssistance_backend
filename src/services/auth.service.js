const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (userData) => {
    console.log("🛠️ Attempting to register user with data:", userData);
    const { email } = userData;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log("⚠️ User already exists:", email);
        throw new Error('User already exists');
    }
    
    console.log("📝 Creating user in DB...");
    const user = await User.create(userData);
    console.log("✅ User created successfully:", user._id);
    
    const token = generateToken(user._id);
    return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const token = generateToken(user._id);
    return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

module.exports = { registerUser, loginUser };
