// File: server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
const authRoutes = require('./routes/auth.routes');
const noticeRoutes = require('./routes/notice.routes');
const grievanceRoutes = require('./routes/grievance.routes');
const userRoutes = require('./routes/user.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const markRoutes = require('./routes/mark.routes');

app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/grievances', grievanceRoutes); // This is the crucial line
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', markRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

