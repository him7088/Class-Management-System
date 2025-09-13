// File: server/controllers/mark.controller.js
const Mark = require('../models/mark.model');
const User = require('../models/user.model');

// POST /api/marks - Add or update marks for a student
exports.addOrUpdateMarks = async (req, res) => {
    try {
        const { studentId, subject, marksObtained, totalMarks } = req.body;
        
        const obtained = parseInt(marksObtained, 10);
        const total = parseInt(totalMarks, 10);

        if (!studentId || !subject || isNaN(obtained) || isNaN(total)) {
            return res.status(400).json({ message: "Student ID, subject, and valid marks are required." });
        }
        
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: "Student not found." });
        }

        const updatedMark = await Mark.findOneAndUpdate(
            { student: studentId, subject: subject },
            {
                marksObtained: obtained,
                totalMarks: total,
                teacher: req.user.id,
            },
            {
                new: true,
                upsert: true,
            }
        );
        
        res.status(201).json(updatedMark);

    } catch (error) {
        console.error("ERROR ADDING/UPDATING MARKS:", error);
        res.status(500).json({ message: "Server error while adding marks.", error: error.message });
    }
};

// GET /api/marks/student/:studentId - Get marks for a specific student
exports.getMarksForStudent = async (req, res) => {
    try {
        if (req.user.role !== 'teacher' && !req.user._id.equals(req.params.studentId)) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to view these marks.' });
        }

        const marks = await Mark.find({ student: req.params.studentId }).populate('teacher', 'name');

        // --- THIS IS THE FIX ---
        // Filter out any potentially bad data before sending it to the frontend.
        const validMarks = marks.filter(mark => 
            typeof mark.marksObtained === 'number' && typeof mark.totalMarks === 'number' && mark.totalMarks > 0
        );
        // --- END OF FIX ---

        res.status(200).json(validMarks);
    } catch (error) {
        console.error("ERROR FETCHING MARKS:", error);
        res.status(500).json({ message: "Server error while fetching marks.", error: error.message });
    }
};

