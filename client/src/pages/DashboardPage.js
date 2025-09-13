// File: client/src/pages/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORT THIS
import { useAuth } from '../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate(); // <--- 2. INITIALIZE THE HOOK

  const handleLogout = () => {
    logout();
    navigate('/login'); // <--- 3. NAVIGATE IMMEDIATELY AFTER LOGOUT
  };

  if (loading) {
    return <div className="text-center p-10">Loading user information...</div>;
  }

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</h1>
            <p className="text-gray-500">Your central hub for school management.</p>
        </div>
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Logout
        </button>
      </div>

      {user?.role === 'student' && <StudentDashboard />}
      {user?.role === 'teacher' && <TeacherDashboard />}
      
      {!user && !loading && ( // Added !loading to prevent flash of message
        <p className="text-red-500">Could not determine user role. Please try logging out and back in.</p>
      )}
    </div>
  );
}

export default DashboardPage;

