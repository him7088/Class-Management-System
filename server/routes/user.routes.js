// File: server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/users/students - Get all users with the 'student' role.
// This route is protected. The role check will happen inside the controller.
router.get('/students', protect, getAllStudents);

module.exports = router;

