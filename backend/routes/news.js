const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken, isOrganizer } = require('../middleware/auth');

// Get all news
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [news] = await connection.query(
            'SELECT * FROM news ORDER BY date DESC'
        );

        connection.release();

        res.json({
            success: true,
            news
        });
    } catch (error) {
        console.error('Get news error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get news',
            error: error.message
        });
    }
});

// Get news by ID
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [news] = await connection.query(
            'SELECT * FROM news WHERE id = ?',
            [req.params.id]
        );

        connection.release();

        if (news.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'News not found'
            });
        }

        res.json({
            success: true,
            news: news[0]
        });
    } catch (error) {
        console.error('Get news error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get news',
            error: error.message
        });
    }
});

// Create news (organizer only)
router.post('/', verifyToken, isOrganizer, async (req, res) => {
    try {
        const { title, content, category, image, date } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
        }

        const connection = await pool.getConnection();

        const newsId = `news${Date.now()}`;

        await connection.query(
            'INSERT INTO news (id, title, content, author_id, author_name, category, image, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [newsId, title, content, req.user.id, req.user.name, category || null, image || null, date || new Date().toISOString().split('T')[0]]
        );

        connection.release();

        res.status(201).json({
            success: true,
            message: 'News created successfully',
            newsId
        });
    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create news',
            error: error.message
        });
    }
});

// Update news (organizer only)
router.put('/:id', verifyToken, isOrganizer, async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        const connection = await pool.getConnection();

        // Check if news exists and belongs to author
        const [news] = await connection.query(
            'SELECT * FROM news WHERE id = ? AND author_id = ?',
            [req.params.id, req.user.id]
        );

        if (news.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'News not found or you do not have permission to edit it'
            });
        }

        await connection.query(
            'UPDATE news SET title = ?, content = ?, category = ?, image = ? WHERE id = ?',
            [title || news[0].title, content || news[0].content, category || news[0].category, image || news[0].image, req.params.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'News updated successfully'
        });
    } catch (error) {
        console.error('Update news error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update news',
            error: error.message
        });
    }
});

// Delete news (organizer only)
router.delete('/:id', verifyToken, isOrganizer, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if news exists and belongs to author
        const [news] = await connection.query(
            'SELECT * FROM news WHERE id = ? AND author_id = ?',
            [req.params.id, req.user.id]
        );

        if (news.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'News not found or you do not have permission to delete it'
            });
        }

        await connection.query('DELETE FROM news WHERE id = ?', [req.params.id]);

        connection.release();

        res.json({
            success: true,
            message: 'News deleted successfully'
        });
    } catch (error) {
        console.error('Delete news error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete news',
            error: error.message
        });
    }
});

module.exports = router;

