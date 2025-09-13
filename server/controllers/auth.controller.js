// File: server/controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("REGISTRATION ERROR:", error);
        res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error during login.", error: error.message });
    }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        console.error("GET ME ERROR:", error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

