// File: client/src/pages/NoticesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Import our new api helper

function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await api.get('/notices'); // Use the api helper
        setNotices(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch notices. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notices</h1>
          <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
        </div>
        
        {loading && <p className="text-center text-gray-500">Loading notices...</p>}
        {error && <p className="bg-red-100 text-red-700 text-center p-3 rounded">{error}</p>}
        
        {!loading && !error && (
          <div className="space-y-4">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div key={notice._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{notice.title}</h2>
                  <p className="text-gray-700 mb-4">{notice.content}</p>
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No notices found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoticesPage;
