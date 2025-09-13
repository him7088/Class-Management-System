// File: server/models/grievance.model.js
const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // --- THIS IS THE FIX ---
    // The field name should be 'student' to match the controller.
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // --- END OF FIX ---
    status: {
      type: String,
      enum: ['Submitted', 'In Review', 'Resolved'],
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
  }
);

const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;

