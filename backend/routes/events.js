const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const { verifyToken, isOrganizer } = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [events] = await connection.query(
            'SELECT * FROM events ORDER BY date DESC'
        );

        // Get registrations for each event
        for (let event of events) {
            const [registrations] = await connection.query(
                'SELECT student_id FROM event_registrations WHERE event_id = ?',
                [event.id]
            );
            event.registrations = registrations.map(r => r.student_id);
        }

        connection.release();

        res.json({
            success: true,
            events
        });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get events',
            error: error.message
        });
    }
});

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ?',
            [req.params.id]
        );

        if (events.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        const event = events[0];

        // Get registrations
        const [registrations] = await connection.query(
            'SELECT student_id FROM event_registrations WHERE event_id = ?',
            [event.id]
        );
        event.registrations = registrations.map(r => r.student_id);

        // Get tags
        const [tags] = await connection.query(
            'SELECT tag FROM event_tags WHERE event_id = ?',
            [event.id]
        );
        event.tags = tags.map(t => t.tag);

        connection.release();

        res.json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get event',
            error: error.message
        });
    }
});

// Create event (organizer only). In development, allows unauthenticated create when organizer info is provided in body.
router.post('/', async (req, res) => {
    try {
        const { title, description, date, time, location, category, max_capacity, tags, image, organizer_id, organizer_name } = req.body;

        if (!title || !description || !date || !time || !location) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Determine user (from token or development bypass)
        let user = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.split(' ')[1]) {
            try {
                const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
                user = decoded;
                if (user.role !== 'organizer') {
                    return res.status(403).json({ success: false, message: 'Only organizers can perform this action' });
                }
            } catch (err) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }
        } else if (process.env.NODE_ENV === 'development' && organizer_id && organizer_name) {
            // Development bypass: accept organizer info from body
            user = { id: organizer_id, name: organizer_name, role: 'organizer' };
        } else {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const connection = await pool.getConnection();

        const eventId = `evt${Date.now()}`;

        // Insert event
        await connection.query(
            'INSERT INTO events (id, title, description, date, time, location, category, organizer_id, organizer_name, max_capacity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [eventId, title, description, date, time, location, category || null, user.id, user.name, max_capacity || 100, image || null]
        );

        // Insert tags
        if (tags && Array.isArray(tags)) {
            for (let tag of tags) {
                await connection.query(
                    'INSERT INTO event_tags (event_id, tag) VALUES (?, ?)',
                    [eventId, tag]
                );
            }
        }

        connection.release();

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            eventId
        });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create event',
            error: error.message
        });
    }
});

// Update event (organizer only)
router.put('/:id', verifyToken, isOrganizer, async (req, res) => {
    try {
        const { title, description, date, time, location, category, status, max_capacity, image } = req.body;

        const connection = await pool.getConnection();

        // Check if event exists and belongs to organizer
        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ? AND organizer_id = ?',
            [req.params.id, req.user.id]
        );

        if (events.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Event not found or you do not have permission to edit it'
            });
        }

        // Update event
        await connection.query(
            'UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, category = ?, status = ?, max_capacity = ?, image = ? WHERE id = ?',
            [title || events[0].title, description || events[0].description, date || events[0].date, time || events[0].time, location || events[0].location, category || events[0].category, status || events[0].status, max_capacity || events[0].max_capacity, image || events[0].image, req.params.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Event updated successfully'
        });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update event',
            error: error.message
        });
    }
});

// Delete event (organizer only)
router.delete('/:id', verifyToken, isOrganizer, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if event exists and belongs to organizer
        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ? AND organizer_id = ?',
            [req.params.id, req.user.id]
        );

        if (events.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Event not found or you do not have permission to delete it'
            });
        }

        // Delete event (cascades to registrations and tags)
        await connection.query('DELETE FROM events WHERE id = ?', [req.params.id]);

        connection.release();

        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete event',
            error: error.message
        });
    }
});

// Register for event
router.post('/:id/register', verifyToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Check if event exists
        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ?',
            [req.params.id]
        );

        if (events.length === 0) {
            connection.release();
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if already registered
        const [existing] = await connection.query(
            'SELECT * FROM event_registrations WHERE event_id = ? AND student_id = ?',
            [req.params.id, req.user.id]
        );

        if (existing.length > 0) {
            connection.release();
            return res.status(400).json({
                success: false,
                message: 'Already registered for this event'
            });
        }

        // Register
        await connection.query(
            'INSERT INTO event_registrations (event_id, student_id) VALUES (?, ?)',
            [req.params.id, req.user.id]
        );

        connection.release();

        res.json({
            success: true,
            message: 'Registered for event successfully'
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register for event',
            error: error.message
        });
    }
});

module.exports = router;

