// File: server/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);

// GET /api/auth/me - gets the currently logged-in user's data
router.get('/me', protect, getMe);

module.exports = router;

