const jwt = require('jsonwebtoken');

// Verify JWT token
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// Check if user is organizer
const isOrganizer = (req, res, next) => {
    if (req.user.role !== 'organizer') {
        return res.status(403).json({
            success: false,
            message: 'Only organizers can perform this action'
        });
    }
    next();
};

// Check if user is student
const isStudent = (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({
            success: false,
            message: 'Only students can perform this action'
        });
    }
    next();
};

module.exports = {
    verifyToken,
    isOrganizer,
    isStudent
};

