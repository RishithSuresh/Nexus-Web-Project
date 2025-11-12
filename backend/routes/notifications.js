const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Get all notifications for user
router.get('/', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [notifications] = await connection.query(
            'SELECT * FROM notifications WHERE recipient_id = ? ORDER BY created_at DESC',
            [req.user.id]
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

// Get unread notification count
router.get('/count/unread', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [result] = await connection.query(
            'SELECT COUNT(*) as count FROM notifications WHERE recipient_id = ? AND is_read = FALSE',
            [req.user.id]
        );

        connection.release();

        res.json({
            success: true,
            unreadCount: result[0].count
        });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get unread count',
            error: error.message
        });
    }
});

// Mark notification as read
router.put('/:id/read', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if notification belongs to user
        const [notifications] = await connection.query(
            'SELECT * FROM notifications WHERE id = ? AND recipient_id = ?',
            [req.params.id, req.user.id]
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
            [req.params.id]
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

// Mark all notifications as read
router.put('/read/all', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        await connection.query(
            'UPDATE notifications SET is_read = TRUE WHERE recipient_id = ?',
            [req.user.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        console.error('Mark all notifications error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark notifications',
            error: error.message
        });
    }
});

// Delete notification
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if notification belongs to user
        const [notifications] = await connection.query(
            'SELECT * FROM notifications WHERE id = ? AND recipient_id = ?',
            [req.params.id, req.user.id]
        );

        if (notifications.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        await connection.query(
            'DELETE FROM notifications WHERE id = ?',
            [req.params.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Notification deleted'
        });
    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete notification',
            error: error.message
        });
    }
});

module.exports = router;

