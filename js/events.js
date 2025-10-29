/* ===================================
   EVENTS PAGE SCRIPT
   Handles event display, filtering, and registration
   =================================== */

let allEvents = [];
let filteredEvents = [];

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupEventListeners();
    checkForEventParam();
});

// Load all events
function loadEvents() {
    allEvents = db.getEvents();
    filteredEvents = [...allEvents];
    displayEvents();
}

// Display events in grid
function displayEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    if (filteredEvents.length === 0) {
        showEmptyState(eventsGrid, 'No events found matching your criteria', '📅');
        return;
    }
    
    // Sort events: ongoing first, then by date
    const sortedEvents = sortEventsByDate(filteredEvents);
    
    eventsGrid.innerHTML = sortedEvents.map(event => createEventCard(event)).join('');
    
    // Add click handlers to open event details
    eventsGrid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            showEventDetails(eventId);
        });
    });
}

// Setup event listeners for search and filters
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const dateFromFilter = document.getElementById('dateFromFilter');
    const dateToFilter = document.getElementById('dateToFilter');
    const capacityFilter = document.getElementById('capacityFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }

    if (dateFromFilter) {
        dateFromFilter.addEventListener('change', applyFilters);
    }

    if (dateToFilter) {
        dateToFilter.addEventListener('change', applyFilters);
    }

    if (capacityFilter) {
        capacityFilter.addEventListener('change', applyFilters);
    }
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const status = document.getElementById('statusFilter')?.value || 'all';
    const dateFrom = document.getElementById('dateFromFilter')?.value || '';
    const dateTo = document.getElementById('dateToFilter')?.value || '';
    const capacity = document.getElementById('capacityFilter')?.value || 'all';

    filteredEvents = allEvents.filter(event => {
        const matchesSearch = !searchTerm ||
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm);

        const matchesCategory = category === 'all' || event.category === category;
        const matchesStatus = status === 'all' || event.status === status;

        // Date range filter
        const eventDate = new Date(event.date);
        const matchesDateFrom = !dateFrom || eventDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || eventDate <= new Date(dateTo);

        // Capacity filter
        const spotsLeft = event.maxCapacity - event.registrations.length;
        let matchesCapacity = true;
        if (capacity === 'available') {
            matchesCapacity = spotsLeft > 0;
        } else if (capacity === 'full') {
            matchesCapacity = spotsLeft === 0;
        }

        return matchesSearch && matchesCategory && matchesStatus && matchesDateFrom && matchesDateTo && matchesCapacity;
    });
    
    displayEvents();
}

// Show event details in modal
function showEventDetails(eventId) {
    const event = db.getEventById(eventId);
    if (!event) return;
    
    const isLoggedIn = auth.isLoggedIn();
    const isStudent = auth.isStudent();
    const isOrganizer = auth.isOrganizer();
    const userData = auth.getUserData();
    
    const isRegistered = isStudent && userData?.registeredEvents?.includes(eventId);
    const isOwnEvent = isOrganizer && userData?.createdEvents?.includes(eventId);
    const isFull = event.registrations.length >= event.maxCapacity;
    const spotsLeft = event.maxCapacity - event.registrations.length;
    const isFavorite = isStudent && db.isFavorite(userData?.id, eventId);
    const avgRating = db.getEventAverageRating(eventId);
    const reviews = db.getEventReviews(eventId);

    let actionButtons = '';
    
    if (!isLoggedIn) {
        actionButtons = `
            <a href="login.html" class="btn btn-primary">Login to Register</a>
            <button class="btn btn-outline" onclick="closeModal()">Close</button>
        `;
    } else if (isStudent) {
        const favoriteBtn = `<button class="btn btn-outline" onclick="toggleFavorite('${eventId}')" title="Add to favorites">
            ${isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
        </button>`;

        if (isRegistered) {
            actionButtons = `
                <button class="btn btn-danger" onclick="unregisterFromEvent('${eventId}')">Unregister</button>
                ${favoriteBtn}
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            `;
        } else if (isFull) {
            actionButtons = `
                <button class="btn btn-secondary" disabled>Event Full</button>
                ${favoriteBtn}
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            `;
        } else {
            actionButtons = `
                <button class="btn btn-primary" onclick="registerForEvent('${eventId}')">Register Now</button>
                ${favoriteBtn}
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            `;
        }
    } else if (isOrganizer) {
        if (isOwnEvent) {
            actionButtons = `
                <button class="btn btn-secondary" onclick="viewRegistrations('${eventId}')">View Registrations (${event.registrations.length})</button>
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            `;
        } else {
            actionButtons = `
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
            `;
        }
    }
    
    const content = `
        <div class="event-detail">
            <img src="${event.image}" alt="${event.title}" class="event-detail-image">
            <div class="event-detail-content">
                <div class="event-detail-header">
                    <span class="event-category">${event.category}</span>
                    ${getStatusBadge(event.status)}
                </div>
                <h2>${event.title}</h2>
                <p class="event-detail-description">${event.description}</p>
                
                <div class="event-detail-info">
                    <div class="info-item">
                        <span class="info-icon">📅</span>
                        <div>
                            <strong>Date</strong>
                            <p>${formatDate(event.date)}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">🕐</span>
                        <div>
                            <strong>Time</strong>
                            <p>${event.time}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">📍</span>
                        <div>
                            <strong>Location</strong>
                            <p>${event.location}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">👤</span>
                        <div>
                            <strong>Organizer</strong>
                            <p>${event.organizerName}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">👥</span>
                        <div>
                            <strong>Capacity</strong>
                            <p>${event.registrations.length} / ${event.maxCapacity} registered</p>
                            ${!isFull ? `<p class="spots-left">${spotsLeft} spots left</p>` : '<p class="event-full">Event Full</p>'}
                        </div>
                    </div>
                </div>
                
                ${event.tags && event.tags.length > 0 ? `
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}

                ${avgRating > 0 ? `
                    <div class="event-rating-section">
                        <h3>⭐ Event Rating</h3>
                        <div class="rating-display">
                            <span class="rating-value">${avgRating}</span>
                            <span class="rating-count">(${reviews.length} reviews)</span>
                        </div>
                    </div>
                ` : ''}

                ${reviews.length > 0 ? `
                    <div class="event-reviews-section">
                        <h3>📝 Reviews</h3>
                        <div class="reviews-list">
                            ${reviews.slice(0, 3).map(review => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <strong>${review.userName}</strong>
                                        <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
                                    </div>
                                    <p class="review-text">${review.review}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    showModal(event.title, content, []);
    
    // Add action buttons to modal footer
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = actionButtons;
    }
}

// Register for event
function registerForEvent(eventId) {
    if (!auth.isLoggedIn() || !auth.isStudent()) {
        showToast('Please login as a student to register', 'error');
        return;
    }

    const success = db.registerForEvent(auth.currentUser.id, eventId);

    if (success) {
        showToast('Successfully registered for event!', 'success');

        // Send notification
        if (typeof notifyEventRegistration === 'function') {
            notifyEventRegistration(auth.currentUser.id, eventId);
        }

        closeModal();
        loadEvents(); // Refresh events display
    } else {
        showToast('Failed to register. Event may be full.', 'error');
    }
}

// Unregister from event
function unregisterFromEvent(eventId) {
    if (!auth.isLoggedIn() || !auth.isStudent()) {
        showToast('Please login as a student', 'error');
        return;
    }
    
    const success = db.unregisterFromEvent(auth.currentUser.id, eventId);
    
    if (success) {
        showToast('Successfully unregistered from event', 'info');
        closeModal();
        loadEvents(); // Refresh events display
    } else {
        showToast('Failed to unregister', 'error');
    }
}

// View registrations (for organizers)
function viewRegistrations(eventId) {
    const event = db.getEventById(eventId);
    if (!event) return;
    
    const registrations = event.registrations.map(userId => {
        const user = db.getUserById(userId);
        return user ? user.profile : null;
    }).filter(profile => profile !== null);
    
    let content = '<div class="registrations-list">';
    
    if (registrations.length === 0) {
        content += '<p>No registrations yet.</p>';
    } else {
        content += '<table class="registrations-table"><thead><tr><th>Name</th><th>Email</th><th>Department</th></tr></thead><tbody>';
        registrations.forEach(profile => {
            content += `
                <tr>
                    <td>${profile.name}</td>
                    <td>${profile.email}</td>
                    <td>${profile.department || 'N/A'}</td>
                </tr>
            `;
        });
        content += '</tbody></table>';
    }
    
    content += '</div>';
    
    showModal(`Registrations for ${event.title}`, content, []);
    
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '<button class="btn btn-outline" onclick="closeModal()">Close</button>';
    }
}

// Check if event ID is in URL parameters
function checkForEventParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');

    if (eventId) {
        setTimeout(() => {
            showEventDetails(eventId);
        }, 100);
    }
}

// Toggle favorite event
function toggleFavorite(eventId) {
    if (!auth.isLoggedIn() || !auth.isStudent()) {
        showToast('Please login as a student to add favorites', 'error');
        return;
    }

    const user = auth.getUserData();
    const isFavorite = db.isFavorite(user.id, eventId);

    if (isFavorite) {
        db.removeFromFavorites(user.id, eventId);
        showToast('Removed from favorites', 'success');
    } else {
        db.addToFavorites(user.id, eventId);
        showToast('Added to favorites', 'success');
    }

    // Refresh the modal
    closeModal();
    setTimeout(() => showEventDetails(eventId), 100);
}

