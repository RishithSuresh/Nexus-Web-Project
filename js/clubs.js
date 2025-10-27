/* ===================================
   CLUBS PAGE SCRIPT
   Handles club display and filtering
   =================================== */

let allClubs = [];
let filteredClubs = [];

document.addEventListener('DOMContentLoaded', () => {
    loadClubs();
    setupEventListeners();
});

// Load all clubs
function loadClubs() {
    allClubs = db.getClubs();
    filteredClubs = [...allClubs];
    displayClubs();
}

// Display clubs in grid
function displayClubs() {
    const clubsGrid = document.getElementById('clubsGrid');
    if (!clubsGrid) return;

    if (filteredClubs.length === 0) {
        showEmptyState(clubsGrid, 'No clubs found matching your criteria', '🎯');
        return;
    }

    clubsGrid.innerHTML = filteredClubs.map(club => createClubCard(club)).join('');

    // Add click handlers to club cards
    clubsGrid.querySelectorAll('.club-card').forEach(card => {
        card.addEventListener('click', () => {
            const clubId = card.dataset.clubId;  // data-club-id becomes clubId
            showClubDetails(clubId);
        });
    });
}

// Setup event listeners for search and filters
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';

    filteredClubs = allClubs.filter(club => {
        const matchesSearch = !searchTerm ||
            club.name.toLowerCase().includes(searchTerm) ||
            club.description.toLowerCase().includes(searchTerm);

        const matchesCategory = category === 'all' || club.category === category;

        return matchesSearch && matchesCategory;
    });

    displayClubs();
}

// Show club details in modal
function showClubDetails(clubId) {
    const club = db.getClubById(clubId);
    if (!club) return;

    // Get organized events
    const organizedEventIds = club.organizedEvents || [];
    const organizedEvents = organizedEventIds
        .map(eventId => db.getEventById(eventId))
        .filter(event => event !== undefined);

    // Build events list HTML
    let eventsListHTML = '';
    if (organizedEvents.length > 0) {
        eventsListHTML = `
            <div class="detail-section">
                <h3>📅 Organized Events</h3>
                <div class="organized-events-list">
                    ${organizedEvents.map(event => `
                        <div class="organized-event-item">
                            <div class="event-title">${event.title}</div>
                            <div class="event-meta">
                                <span class="event-date">📅 ${formatDateShort(event.date)}</span>
                                <span class="event-time">🕐 ${event.time}</span>
                                <span class="event-status badge badge-${event.status === 'ongoing' ? 'success' : 'primary'}">${event.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        eventsListHTML = `
            <div class="detail-section">
                <h3>📅 Organized Events</h3>
                <p class="no-events">No events organized yet</p>
            </div>
        `;
    }

    const modalContent = `
        <div class="modal-header">
            <h2>${club.name}</h2>
            <span class="badge badge-primary">${club.category}</span>
        </div>

        <div class="modal-body">
            <div class="club-details">
                <div class="detail-section">
                    <h3>📝 About</h3>
                    <p>${club.description}</p>
                </div>

                <div class="detail-section">
                    <h3>👥 Contact Information</h3>
                    <div class="contact-info">
                        <p><strong>President:</strong> ${club.contact.president}</p>
                        <p><strong>Advisor:</strong> ${club.contact.advisor}</p>
                        <p><strong>Email:</strong> <a href="mailto:${club.contact.email}">${club.contact.email}</a></p>
                        <p><strong>Phone:</strong> <a href="tel:${club.contact.phone}">${club.contact.phone}</a></p>
                    </div>
                </div>

                <div class="detail-section">
                    <h3>📍 Meeting Details</h3>
                    <div class="meeting-info">
                        <p><strong>Time:</strong> ${club.meetingTime}</p>
                        <p><strong>Location:</strong> ${club.location}</p>
                        <p><strong>Members:</strong> ${club.members}</p>
                    </div>
                </div>

                ${eventsListHTML}
            </div>
        </div>
    `;

    showModal('Club Details', modalContent, [
        { text: 'Close', onclick: 'closeModal()', class: 'btn-outline' }
    ]);
}

