// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy user data
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

// Middleware for parsing JSON bodies
app.use(express.json());

// Authentication middleware
const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Authorization middleware for admin role
const authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// Login route
app.post('/login', authenticate, (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// Protected route accessible only to admins
app.get('/admin', authorizeAdmin, (req, res) => {
    res.json({ message: 'Admin-only route', user: req.user });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
