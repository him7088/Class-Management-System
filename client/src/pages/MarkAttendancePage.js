// File: client/src/pages/MarkAttendancePage.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function MarkAttendancePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attendance, setAttendance] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // This endpoint fetches all users with the role 'student'
        const res = await api.get('/users/students');
        setStudents(res.data);
        // Initialize attendance state for each student
        const initialAttendance = res.data.reduce((acc, student) => {
          acc[student._id] = 'present'; // Default to 'present'
          return acc;
        }, {});
        setAttendance(initialAttendance);
        setError('');
      } catch (err) {
        setError('Failed to fetch students. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const attendanceData = {
        date: new Date().toISOString().split('T')[0], // Get today's date in YYYY-MM-DD format
        records: Object.entries(attendance).map(([studentId, status]) => ({
          student: studentId,
          status: status,
        })),
      };
      // This endpoint posts the new attendance record
      await api.post('/attendance', attendanceData);
      setSuccess('Attendance submitted successfully!');
    } catch (err) {
      setError('Failed to submit attendance. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading students...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mark Attendance for {new Date().toLocaleDateString()}</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{success}</div>}

      {students.length === 0 && !loading ? (
        <p className="text-gray-500">No students found. Please add students to the system first.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`status-${student._id}`}
                            className="form-radio h-4 w-4 text-green-600"
                            checked={attendance[student._id] === 'present'}
                            onChange={() => handleStatusChange(student._id, 'present')}
                          />
                          <span className="ml-2 text-sm text-gray-700">Present</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`status-${student._id}`}
                            className="form-radio h-4 w-4 text-red-600"
                            checked={attendance[student._id] === 'absent'}
                            onChange={() => handleStatusChange(student._id, 'absent')}
                          />
                          <span className="ml-2 text-sm text-gray-700">Absent</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Submit Attendance
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default MarkAttendancePage;

