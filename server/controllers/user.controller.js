// File: server/controllers/user.controller.js
const User = require('../models/user.model');

// GET /api/users/students
exports.getAllStudents = async (req, res) => {
    try {
        // This security check should be here to be safe
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: "Forbidden: You must be a teacher to perform this action." });
        }

        const students = await User.find({ role: 'student' }).select('-password');
        res.status(200).json(students);
        
    } catch (error) {
        console.error("ERROR inside getAllStudents controller:", error);
        res.status(500).json({ message: "Server error while fetching students." });
    }
};

