const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');

// GET /api/notices -> Get all notices
router.get('/', noticeController.getAllNotices);

// POST /api/notices -> Create a new notice
router.post('/', noticeController.createNotice);

// GET /api/notices/:id -> Get a single notice by its ID
router.get('/:id', noticeController.getNoticeById);

// DELETE /api/notices/:id -> Delete a notice by its ID
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;

