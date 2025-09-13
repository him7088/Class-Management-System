// File: client/src/pages/TeacherDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
  return (
    <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/notices" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">Manage Notices</h3>
                <p className="text-gray-600">Post and view announcements.</p>
            </Link>
            <Link to="/mark-attendance" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">Mark Attendance</h3>
                <p className="text-gray-600">Record student attendance for today.</p>
            </Link>
             <Link to="/add-marks" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">Add/Update Marks</h3>
                <p className="text-gray-600">Enter and manage student marks.</p>
            </Link>
        </div>
    </div>
  );
}

export default TeacherDashboard;

