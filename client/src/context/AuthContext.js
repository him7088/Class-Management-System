// File: client/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await api.get('/api/auth/me');
                    setUser(response.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/api/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const userResponse = await api.get('/api/auth/me');
            setUser(userResponse.data);
            setIsAuthenticated(true);
            setLoading(false);
            return { success: true };
        } catch (error) {
            // --- DIAGNOSTIC LOG ---
            // This will print the detailed error from the server to your browser's console.
            console.error("LOGIN API CALL FAILED:", error.response || error);
            // -------------------------
            
            setLoading(false);
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

