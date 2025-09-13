// File: client/src/pages/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/notices" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">View Notices</h3>
                <p className="text-gray-600">Check the latest updates and announcements.</p>
            </Link>
            <Link to="/grievances" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">Manage Grievances</h3>
                <p className="text-gray-600">Submit and track your grievances.</p>
            </Link>
            <Link to="/view-marks" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg">View Marks</h3>
                <p className="text-gray-600">Check your academic performance.</p>
            </Link>
        </div>
    </div>
  );
}

export default StudentDashboard;

