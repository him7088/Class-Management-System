// File: server/routes/grievance.routes.js

// --- DIAGNOSTIC LOG ---
console.log('--- Loading grievance.routes.js file ---');
// --------------------

const express = require('express');
const router = express.Router();
const { createGrievance, getGrievances } = require('../controllers/grievance.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/grievances
router.get('/', protect, getGrievances);

// POST /api/grievances
router.post('/', protect, createGrievance);

// --- DIAGNOSTIC LOG ---
console.log('Grievance routes configured and exported successfully.');
// --------------------

module.exports = router;

