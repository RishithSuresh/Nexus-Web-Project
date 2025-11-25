/* ===================================
   UI UTILITIES
   Reusable UI components and helper functions
   =================================== */

// Loading state management
function showLoadingState(element, message = 'Loading...') {
    if (!element) return;
    element.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

function hideLoadingState(element) {
    if (!element) return;
    const loadingState = element.querySelector('.loading-state');
    if (loadingState) {
        loadingState.remove();
    }
}

// Show error message
function showErrorMessage(element, message = 'An error occurred') {
    if (!element) return;
    element.innerHTML = `
        <div class="error-message">
            <span class="error-icon">⚠️</span>
            <p>${message}</p>
        </div>
    `;
}

// Show empty state
function showEmptyState(element, message = 'No items found', icon = '📭') {
    if (!element) return;
    element.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">${icon}</div>
            <p>${message}</p>
        </div>
    `;
}

// Format date to readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format date to short string
function formatDateShort(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Check if date is in the past
function isPastDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

// Check if date is today
function isToday(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

// Get event status badge HTML
function getStatusBadge(status) {
    const badges = {
        ongoing: '<span class="badge badge-success">Ongoing</span>',
        upcoming: '<span class="badge badge-primary">Upcoming</span>',
        completed: '<span class="badge badge-secondary">Completed</span>'
    };
    return badges[status] || '';
}

// Create event card HTML
function createEventCard(event) {
    const isRegistered = auth.isLoggedIn() && auth.isStudent() && 
                         auth.getUserData().registeredEvents?.includes(event.id);
    
    const spotsLeft = event.maxCapacity - event.registrations.length;
    const isFull = spotsLeft <= 0;
    
    return `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image" style="background-image: url('${event.image}')">
                ${getStatusBadge(event.status)}
            </div>
            <div class="event-content">
                <div class="event-category">${event.category}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description.substring(0, 120)}...</p>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <span class="icon">📅</span>
                        <span>${formatDateShort(event.date)}</span>
                    </div>
                    <div class="event-meta-item">
                        <span class="icon">🕐</span>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <span class="icon">📍</span>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-footer">
                    <div class="event-capacity">
                        <span class="icon">👥</span>
                        <span>${event.registrations.length}/${event.maxCapacity}</span>
                        ${isFull ? '<span class="full-badge">Full</span>' : ''}
                    </div>
                    ${isRegistered ? '<span class="registered-badge">✓ Registered</span>' : ''}
                </div>
            </div>
        </div>
    `;
}

// Create news card HTML
function createNewsCard(news) {
    return `
        <div class="news-card" data-news-id="${news.id}">
            <div class="news-image" style="background-image: url('${news.image}')"></div>
            <div class="news-content">
                <div class="news-category">${news.category}</div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <span class="news-date">📅 ${formatDateShort(news.date)}</span>
                    <span class="news-author">✍️ ${news.author}</span>
                </div>
            </div>
        </div>
    `;
}

// Create club card HTML
function createClubCard(club) {
    return `
        <div class="club-card" data-club-id="${club.id}">
            <div class="club-image" style="background-image: url('${club.image}')"></div>
            <div class="club-content">
                <div class="club-category">${club.category}</div>
                <h3 class="club-name">${club.name}</h3>
                <p class="club-description">${club.description}</p>
                <div class="club-meta">
                    <div class="club-meta-item">
                        <span class="icon">👥</span>
                        <span>${club.members} members</span>
                    </div>
                    <div class="club-meta-item">
                        <span class="icon">🕐</span>
                        <span>${club.meetingTime}</span>
                    </div>
                    <div class="club-meta-item">
                        <span class="icon">📍</span>
                        <span>${club.location}</span>
                    </div>
                </div>
                <div class="club-contact">
                    <strong>President:</strong> ${club.contact.president}<br>
                    <strong>Email:</strong> ${club.contact.email}<br>
                    <strong>Phone:</strong> ${club.contact.phone}
                </div>
            </div>
        </div>
    `;
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Show modal
function showModal(title, content, buttons = []) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const buttonsHTML = buttons.map(btn => 
        `<button class="btn ${btn.class}" onclick="${btn.onclick}">${btn.text}</button>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    return modal;
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
});

// Image file to base64 converter
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Search/Filter functionality
function filterItems(items, searchTerm, filterCategory = 'all') {
    return items.filter(item => {
        const matchesSearch = !searchTerm || 
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = filterCategory === 'all' || 
            item.category === filterCategory;
        
        return matchesSearch && matchesCategory;
    });
}

// Sort events by date
function sortEventsByDate(events) {
    return events.sort((a, b) => {
        // Ongoing events first
        if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
        if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
        
        // Then by date
        return new Date(a.date) - new Date(b.date);
    });
}

// Generate unique ID
function generateId(prefix = 'id') {
    return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const re = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return re.test(phone);
}

// Loading spinner
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner-small"></div>';
}

// Empty state
function showEmptyState(element, message, icon = '📭') {
    element.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">${icon}</div>
            <p>${message}</p>
        </div>
    `;
}

