// File: server/controllers/attendance.controller.js
const Attendance = require('../models/attendance.model');
const User = require('../models/user.model');

// POST /api/attendance - Mark attendance for students
exports.markAttendance = async (req, res) => {
    try {
        const { date, records } = req.body; // records will be an array of { studentId, status }

        if (!date || !records || !Array.isArray(records)) {
            return res.status(400).json({ message: "Date and records array are required." });
        }

        const attendancePromises = records.map(record => {
            return Attendance.findOneAndUpdate(
                { student: record.studentId, date: new Date(date).setHours(0, 0, 0, 0) },
                {
                    student: record.studentId,
                    date: new Date(date).setHours(0, 0, 0, 0),
                    status: record.status,
                    markedBy: req.user.id
                },
                { upsert: true, new: true } // Upsert: create if not exists, update if it does
            );
        });

        await Promise.all(attendancePromises);

        res.status(201).json({ message: "Attendance marked successfully." });

    } catch (error) {
        console.error("ERROR MARKING ATTENDANCE:", error);
        res.status(500).json({ message: "Server error while marking attendance.", error: error.message });
    }
};

// You can add a function to get attendance records later if needed
// exports.getAttendanceByDate = async (req, res) => { ... };

