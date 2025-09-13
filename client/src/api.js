// File: client/src/api.js
import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  // The baseURL should point to your backend server, WITHOUT the /api part.
  baseURL: 'http://localhost:5001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  This interceptor will automatically add the authorization token
  to the headers of every outgoing request if a token is found.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

