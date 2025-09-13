// File: client/src/pages/ViewMarksPage.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function ViewMarksPage() {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchMarks = async () => {
            try {
                const response = await api.get(`/api/marks/student/${user._id}`);
                setMarks(response.data);
            } catch (err) {
                setError('Failed to fetch marks. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchMarks();
    }, [user]);

    if (loading) return <div className="text-center p-4">Loading your marks...</div>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Your Marks</h1>
            {marks.length > 0 ? (
                 <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-left min-w-full">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-4 font-semibold text-gray-600">Subject</th>
                                <th className="p-4 font-semibold text-gray-600">Marks Obtained</th>
                                <th className="p-4 font-semibold text-gray-600">Total Marks</th>
                                <th className="p-4 font-semibold text-gray-600">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map(mark => (
                                <tr key={mark._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{mark.subject}</td>
                                    <td className="p-4">{mark.marksObtained}</td>
                                    <td className="p-4">{mark.totalMarks}</td>
                                    <td className="p-4 font-semibold text-gray-800">
                                        {((mark.marksObtained / mark.totalMarks) * 100).toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p>No marks have been uploaded for you yet.</p>
                </div>
            )}
        </div>
    );
}

export default ViewMarksPage;

