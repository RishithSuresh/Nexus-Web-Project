const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [users] = await connection.query(
            'SELECT id, username, role, name, email, phone, department, year_or_position, bio FROM users WHERE id = ?',
            [req.params.id]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // Get user's events (if organizer)
        if (user.role === 'organizer') {
            const [events] = await connection.query(
                'SELECT id, title, date, status FROM events WHERE organizer_id = ?',
                [user.id]
            );
            user.createdEvents = events;
        }

        // Get user's registered events (if student)
        if (user.role === 'student') {
            const [registrations] = await connection.query(
                'SELECT e.id, e.title, e.date FROM event_registrations er JOIN events e ON er.event_id = e.id WHERE er.student_id = ?',
                [user.id]
            );
            user.registeredEvents = registrations;
        }

        connection.release();

        res.json({
            success: true,
            user
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

// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
    try {
        // Users can only update their own profile
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own profile'
            });
        }

        const { name, email, phone, department, year_or_position, bio, profile_pic } = req.body;

        const connection = await pool.getConnection();

        await connection.query(
            'UPDATE users SET name = ?, email = ?, phone = ?, department = ?, year_or_position = ?, bio = ?, profile_pic = ? WHERE id = ?',
            [name || null, email || null, phone || null, department || null, year_or_position || null, bio || null, profile_pic || null, req.params.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
});

// Get user's notifications
router.get('/:id/notifications', verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only view your own notifications'
            });
        }

        const connection = await pool.getConnection();

        const [notifications] = await connection.query(
            'SELECT * FROM notifications WHERE recipient_id = ? ORDER BY created_at DESC',
            [req.params.id]
        );

        connection.release();

        res.json({
            success: true,
            notifications
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get notifications',
            error: error.message
        });
    }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if notification belongs to user
        const [notifications] = await connection.query(
            'SELECT * FROM notifications WHERE id = ? AND recipient_id = ?',
            [req.params.notificationId, req.user.id]
        );

        if (notifications.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        await connection.query(
            'UPDATE notifications SET is_read = TRUE WHERE id = ?',
            [req.params.notificationId]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        console.error('Mark notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark notification',
            error: error.message
        });
    }
});

module.exports = router;

