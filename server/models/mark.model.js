// File: server/models/mark.model.js
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId, // <-- THIS IS THE FIX
      ref: 'User',                         // <-- THIS IS THE FIX
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;

