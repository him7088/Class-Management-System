// File: client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NoticesPage from './pages/NoticesPage';
import GrievancesPage from './pages/GrievancesPage';
import MarkAttendancePage from './pages/MarkAttendancePage';
import AddMarksPage from './pages/AddMarksPage'; // Import new page
import ViewMarksPage from './pages/ViewMarksPage'; // Import new page

// A wrapper for routes that require a user to be logged in.
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/grievances" element={<GrievancesPage />} />
            <Route path="/mark-attendance" element={<MarkAttendancePage />} />
            <Route path="/add-marks" element={<AddMarksPage />} />
            <Route path="/view-marks" element={<ViewMarksPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

