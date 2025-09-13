// File: server/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Protect routes by verifying token
exports.protect = async (req, res, next) => {
    // --- DIAGNOSTIC LOG 1 ---
    console.log('\n--- Entering PROTECT middleware for route:', req.originalUrl);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // --- DIAGNOSTIC LOG 2 ---
            console.log('Authorization header found.');
            
            token = req.headers.authorization.split(' ')[1];

            // --- DIAGNOSTIC LOG 3 ---
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded successfully:', decoded);

            // --- DIAGNOSTIC LOG 4 ---
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User found in database:', req.user);


            if (!req.user) {
                console.log('ERROR: User not found for this token ID.');
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // --- DIAGNOSTIC LOG 5 ---
            console.log('--- PROTECT middleware successful. Passing to next() ---');
            next();
        } catch (error) {
            // --- DIAGNOSTIC LOG (ERROR) ---
            console.error('ERROR in PROTECT middleware:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        // --- DIAGNOSTIC LOG (NO TOKEN) ---
        console.log('ERROR: No token found in headers.');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Grant access to a specific role
exports.authRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required role.' });
        }
    };
};

