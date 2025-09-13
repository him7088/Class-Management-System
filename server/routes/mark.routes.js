// File: server/routes/mark.routes.js
const express = require('express');
const router = express.Router();
const { addOrUpdateMarks, getMarksForStudent } = require('../controllers/mark.controller');
const { protect, authRole } = require('../middleware/auth.middleware');

// POST /api/marks - Add or update marks (teacher only)
router.post('/', protect, authRole('teacher'), addOrUpdateMarks);

// GET /api/marks/student/:studentId - Get marks for a student (student or teacher)
router.get('/student/:studentId', protect, getMarksForStudent);

module.exports = router;
