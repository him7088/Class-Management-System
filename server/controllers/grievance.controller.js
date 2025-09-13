// File: server/controllers/grievance.controller.js
const Grievance = require('../models/grievance.model');

// POST /api/grievances - Create a new grievance
exports.createGrievance = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const newGrievance = new Grievance({
            title,
            description,
            student: req.user.id, // This now correctly matches the 'student' field in the model
        });

        const savedGrievance = await newGrievance.save();
        res.status(201).json(savedGrievance);

    } catch (error) {
        console.error("ERROR CREATING GRIEVANCE:", error);
        res.status(500).json({ message: "Server error while creating grievance.", error: error.message });
    }
};

// GET /api/grievances - Get all grievances
exports.getGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find().populate('student', 'name email');
        res.status(200).json(grievances);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching grievances.", error: error.message });
    }
};

