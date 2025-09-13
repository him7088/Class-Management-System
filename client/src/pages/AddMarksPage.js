// File: client/src/pages/AddMarksPage.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function AddMarksPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [marks, setMarks] = useState({});
    const [subject, setSubject] = useState('');
    const [totalMarks, setTotalMarks] = useState(100);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/api/users/students');
                setStudents(response.data);
            } catch (err) {
                setError('Failed to fetch students. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleMarkChange = (studentId, value) => {
        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!subject) {
            setError('Please enter a subject name.');
            return;
        }

        try {
            const marksPromises = Object.entries(marks).map(([studentId, marksObtained]) => 
                api.post('/api/marks', {
                    studentId,
                    subject,
                    marksObtained: Number(marksObtained),
                    totalMarks: Number(totalMarks),
                })
            );

            await Promise.all(marksPromises);
            setSuccess('Marks submitted successfully!');
        } catch (err) {
            setError('Failed to submit marks. Please try again.');
        }
    };
    
    if (loading) return <div className="text-center p-4">Loading students...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Add/Update Student Marks</h1>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
            {success && <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{success}</p>}
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">Total Marks</label>
                        <input
                            type="number"
                            id="totalMarks"
                            value={totalMarks}
                            onChange={(e) => setTotalMarks(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {students.length > 0 ? (
                        students.map(student => (
                            <div key={student._id} className="flex items-center justify-between p-3 border rounded-md">
                                <span>{student.name} ({student.email})</span>
                                <input
                                    type="number"
                                    placeholder="Marks"
                                    value={marks[student._id] || ''}
                                    onChange={(e) => handleMarkChange(student._id, e.target.value)}
                                    className="w-24 text-center border border-gray-300 rounded-md"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No students found.</p>
                    )}
                </div>

                <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Submit Marks
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMarksPage;
