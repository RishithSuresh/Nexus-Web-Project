const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, name, email, phone, department, year_or_position } = req.body;

        // Validate input
        if (!username || !password || !role || !name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const connection = await pool.getConnection();

        // Check if user exists
        const [existingUser] = await connection.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            connection.release();
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate user ID
        const userId = `${role === 'student' ? 'stu' : 'org'}${Date.now()}`;

        // Insert user
        await connection.query(
            'INSERT INTO users (id, username, password, role, name, email, phone, department, year_or_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, username, hashedPassword, role, name, email, phone || null, department || null, year_or_position || null]
        );

        connection.release();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Username, password, and role are required'
            });
        }

        const connection = await pool.getConnection();

        // Find user
        const [users] = await connection.query(
            'SELECT * FROM users WHERE username = ? AND role = ?',
            [username, role]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [users] = await connection.query(
            'SELECT id, username, role, name, email, phone, department, year_or_position, bio FROM users WHERE id = ?',
            [req.user.id]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message
        });
    }
});

module.exports = router;

