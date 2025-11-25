/**
 * Advanced Features Module
 * Handles recommendations, notifications, and smart features
 */

class AdvancedFeatures {
    constructor() {
        this.notifications = this.loadNotifications();
    }

    // Load notifications from localStorage
    loadNotifications() {
        const stored = localStorage.getItem('notifications');
        return stored ? JSON.parse(stored) : [];
    }

    // Save notifications to localStorage
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    // Add notification
    addNotification(userId, type, title, message, data = {}) {
        const notification = {
            id: 'notif_' + Date.now(),
            userId,
            type, // 'event_reminder', 'event_update', 'new_event', 'registration_confirmed'
            title,
            message,
            data,
            read: false,
            createdAt: new Date().toISOString()
        };
        
        this.notifications.push(notification);
        this.saveNotifications();
        return notification;
    }

    // Get user notifications
    getUserNotifications(userId) {
        return this.notifications.filter(n => n.userId === userId);
    }

    // Get unread notifications count
    getUnreadCount(userId) {
        return this.notifications.filter(n => n.userId === userId && !n.read).length;
    }

    // Mark notification as read
    markAsRead(notificationId) {
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) {
            notif.read = true;
            this.saveNotifications();
        }
    }

    // Mark all as read
    markAllAsRead(userId) {
        this.notifications.forEach(n => {
            if (n.userId === userId) n.read = true;
        });
        this.saveNotifications();
    }

    // Event Recommendations Engine
    getEventRecommendations(userId, limit = 5) {
        const user = db.getUserById(userId);
        if (!user || user.role !== 'student') return [];

        const registeredEvents = user.registeredEvents || [];
        const favoriteEvents = user.favoriteEvents || [];
        const allEvents = db.getEvents();

        // Get categories from registered and favorite events
        const preferredCategories = new Set();
        [...registeredEvents, ...favoriteEvents].forEach(eventId => {
            const event = db.getEventById(eventId);
            if (event) preferredCategories.add(event.category);
        });

        // Score events based on preferences
        const scoredEvents = allEvents
            .filter(e => !registeredEvents.includes(e.id) && e.status !== 'completed')
            .map(event => {
                let score = 0;
                
                // Category match (40 points)
                if (preferredCategories.has(event.category)) score += 40;
                
                // Availability (30 points)
                const spotsLeft = event.maxCapacity - event.registrations.length;
                if (spotsLeft > 0) score += 30;
                
                // Popularity (20 points)
                const registrationRate = (event.registrations.length / event.maxCapacity) * 100;
                if (registrationRate > 50) score += 20;
                
                // Upcoming soon (10 points)
                const eventDate = new Date(event.date);
                const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
                if (daysUntil > 0 && daysUntil <= 7) score += 10;
                
                return { event, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.event);

        return scoredEvents;
    }

    // Get trending events
    getTrendingEvents(limit = 5) {
        const allEvents = db.getEvents();
        
        return allEvents
            .filter(e => e.status !== 'completed')
            .sort((a, b) => {
                const aRate = a.registrations.length / a.maxCapacity;
                const bRate = b.registrations.length / b.maxCapacity;
                return bRate - aRate;
            })
            .slice(0, limit);
    }

    // Get similar events
    getSimilarEvents(eventId, limit = 4) {
        const event = db.getEventById(eventId);
        if (!event) return [];

        const allEvents = db.getEvents();
        
        return allEvents
            .filter(e => e.id !== eventId && e.category === event.category && e.status !== 'completed')
            .slice(0, limit);
    }

    // Create event reminders for upcoming events
    createEventReminders(userId) {
        const user = db.getUserById(userId);
        if (!user) return;

        const registeredEvents = (user.registeredEvents || [])
            .map(id => db.getEventById(id))
            .filter(e => e !== undefined);

        registeredEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const now = new Date();
            const hoursUntil = (eventDate - now) / (1000 * 60 * 60);

            // Create reminder if event is within 24 hours
            if (hoursUntil > 0 && hoursUntil <= 24) {
                const existingReminder = this.notifications.find(
                    n => n.userId === userId && 
                    n.type === 'event_reminder' && 
                    n.data.eventId === event.id
                );

                if (!existingReminder) {
                    this.addNotification(
                        userId,
                        'event_reminder',
                        `Reminder: ${event.title}`,
                        `Your event starts in ${Math.round(hoursUntil)} hours!`,
                        { eventId: event.id }
                    );
                }
            }
        });
    }

    // Get event insights for organizers
    getEventInsights(eventId) {
        const analytics = db.getEventAnalytics(eventId);
        if (!analytics) return null;

        const event = db.getEventById(eventId);
        const reviews = db.getEventReviews(eventId);
        const avgRating = db.getEventAverageRating(eventId);

        return {
            ...analytics,
            reviews: reviews.length,
            averageRating: avgRating,
            registrationTrend: this._calculateTrend(event.registrations.length, event.maxCapacity),
            recommendations: this._getOrganizerRecommendations(analytics)
        };
    }

    // Calculate trend (up, stable, down)
    _calculateTrend(current, max) {
        const percentage = (current / max) * 100;
        if (percentage > 75) return 'high';
        if (percentage > 50) return 'medium';
        return 'low';
    }

    // Get recommendations for organizers
    _getOrganizerRecommendations(analytics) {
        const recommendations = [];

        if (analytics.registrationRate < 30) {
            recommendations.push('Consider promoting this event more to increase registrations');
        }
        if (analytics.registrationRate > 90) {
            recommendations.push('Event is nearly full! Consider increasing capacity or creating a waitlist');
        }
        if (analytics.spotsLeft === 0) {
            recommendations.push('Event is at full capacity');
        }

        return recommendations;
    }
}

// Initialize global features instance
const features = new AdvancedFeatures();

