/**
 * Notifications Module
 * Handles notification UI and interactions
 */

// Initialize notifications on page load (safe for scripts loaded after DOMContentLoaded)
function initNotificationsIfReady() {
    initializeNotifications();
    setupNotificationListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotificationsIfReady);
} else {
    // DOM already ready — initialize immediately
    initNotificationsIfReady();
}

// Initialize notifications UI
function initializeNotifications() {
    if (!auth.isLoggedIn()) return;
    
    const user = auth.getUserData();
    const bellContainer = document.getElementById('notificationBellContainer');
    
    if (bellContainer) {
        bellContainer.style.display = 'block';
    }
    
    updateNotificationBadge();
    loadNotifications();
    
    // Create reminders for upcoming events
    features.createEventReminders(user.id);
}

// Setup notification event listeners
function setupNotificationListeners() {
    const notificationBell = document.getElementById('notificationBell');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationDropdown) {
                notificationDropdown.classList.toggle('active');
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationDropdown && !notificationDropdown.contains(e.target) && 
            notificationBell && !notificationBell.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });
}

// Update notification badge count
function updateNotificationBadge() {
    if (!auth.isLoggedIn()) return;
    
    const user = auth.getUserData();
    const unreadCount = features.getUnreadCount(user.id);
    const badge = document.getElementById('notificationBadge');
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Load and display notifications
function loadNotifications() {
    if (!auth.isLoggedIn()) return;
    
    const user = auth.getUserData();
    const notifications = features.getUserNotifications(user.id);
    const notificationList = document.getElementById('notificationList');
    
    if (!notificationList) return;
    
    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div style="padding: var(--spacing-lg); text-align: center; color: var(--text-secondary);">
                <p>No notifications yet</p>
            </div>
        `;
        return;
    }
    
    // Sort by date, newest first
    const sorted = notifications.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    notificationList.innerHTML = sorted.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="handleNotificationClick('${notif.id}')">
            <div class="notification-item-title">${notif.title}</div>
            <div class="notification-item-message">${notif.message}</div>
            <div class="notification-item-time">${formatTimeAgo(notif.createdAt)}</div>
        </div>
    `).join('');
}

// Handle notification click
function handleNotificationClick(notificationId) {
    features.markAsRead(notificationId);
    updateNotificationBadge();
    loadNotifications();
}

// Close notifications dropdown
function closeNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Format time ago
function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
}

// Add notification for event registration
function notifyEventRegistration(userId, eventId) {
    const event = db.getEventById(eventId);
    if (!event) return;
    
    features.addNotification(
        userId,
        'registration_confirmed',
        'Registration Confirmed',
        `You've successfully registered for ${event.title}`,
        { eventId }
    );
    
    updateNotificationBadge();
}

// Add notification for event update
function notifyEventUpdate(userId, eventId, updateType) {
    const event = db.getEventById(eventId);
    if (!event) return;
    
    const messages = {
        'date_changed': `The date for ${event.title} has been changed`,
        'location_changed': `The location for ${event.title} has been changed`,
        'cancelled': `${event.title} has been cancelled`,
        'updated': `${event.title} has been updated`
    };
    
    features.addNotification(
        userId,
        'event_update',
        'Event Update',
        messages[updateType] || 'Event has been updated',
        { eventId, updateType }
    );
    
    updateNotificationBadge();
}

// Refresh notifications periodically
setInterval(() => {
    if (auth.isLoggedIn()) {
        updateNotificationBadge();
    }
}, 30000); // Every 30 seconds

