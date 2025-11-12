const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// Get all clubs
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [clubs] = await connection.query(
            'SELECT * FROM clubs ORDER BY name'
        );

        // Get member count for each club
        for (let club of clubs) {
            const [members] = await connection.query(
                'SELECT COUNT(*) as count FROM club_members WHERE club_id = ?',
                [club.id]
            );
            club.members = members[0].count;
        }

        connection.release();

        res.json({
            success: true,
            clubs
        });
    } catch (error) {
        console.error('Get clubs error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get clubs',
            error: error.message
        });
    }
});

// Get club by ID
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [clubs] = await connection.query(
            'SELECT * FROM clubs WHERE id = ?',
            [req.params.id]
        );

        if (clubs.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        const club = clubs[0];

        // Get members
        const [members] = await connection.query(
            'SELECT member_id FROM club_members WHERE club_id = ?',
            [club.id]
        );
        club.memberList = members.map(m => m.member_id);

        connection.release();

        res.json({
            success: true,
            club
        });
    } catch (error) {
        console.error('Get club error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get club',
            error: error.message
        });
    }
});

// Join club
router.post('/:id/join', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if club exists
        const [clubs] = await connection.query(
            'SELECT * FROM clubs WHERE id = ?',
            [req.params.id]
        );

        if (clubs.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Club not found'
            });
        }

        // Check if already member
        const [existing] = await connection.query(
            'SELECT * FROM club_members WHERE club_id = ? AND member_id = ?',
            [req.params.id, req.user.id]
        );

        if (existing.length > 0) {
            connection.release();
            return res.status(400).json({
                success: false,
                message: 'Already a member of this club'
            });
        }

        // Join club
        await connection.query(
            'INSERT INTO club_members (club_id, member_id) VALUES (?, ?)',
            [req.params.id, req.user.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Joined club successfully'
        });
    } catch (error) {
        console.error('Join club error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to join club',
            error: error.message
        });
    }
});

// Leave club
router.post('/:id/leave', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if member
        const [existing] = await connection.query(
            'SELECT * FROM club_members WHERE club_id = ? AND member_id = ?',
            [req.params.id, req.user.id]
        );

        if (existing.length === 0) {
            connection.release();
            return res.status(400).json({
                success: false,
                message: 'Not a member of this club'
            });
        }

        // Leave club
        await connection.query(
            'DELETE FROM club_members WHERE club_id = ? AND member_id = ?',
            [req.params.id, req.user.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Left club successfully'
        });
    } catch (error) {
        console.error('Leave club error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to leave club',
            error: error.message
        });
    }
});

module.exports = router;

