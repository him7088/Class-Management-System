// File: server/routes/attendance.routes.js
const express = require('express');
const router = express.Router();
const { markAttendance } = require('../controllers/attendance.controller');
const { protect, authRole } = require('../middleware/auth.middleware');

// POST /api/attendance - Mark student attendance
// This route is protected and can only be accessed by a teacher
router.post('/', protect, authRole('teacher'), markAttendance);

module.exports = router;

