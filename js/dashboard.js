/* ===================================
   DASHBOARD SCRIPT
   Handles both student and organizer dashboards
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
        navigateToLogin();
        return;
    }

    loadDashboard();
    setupProfilePicUpload();
});

// Load dashboard based on user role
function loadDashboard() {
    const user = auth.getUserData();
    if (!user) {
        navigateToLogin();
        return;
    }
    
    // Update welcome message
    document.getElementById('welcomeMessage').textContent = `Welcome, ${user.profile.name}!`;
    document.getElementById('roleMessage').textContent = `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`;
    
    // Load profile
    loadProfile(user);
    
    // Load role-specific content
    if (auth.isStudent()) {
        loadStudentDashboard(user);
    } else if (auth.isOrganizer()) {
        loadOrganizerDashboard(user);
    }
}

// Load user profile
function loadProfile(user) {
    const profile = user.profile;
    
    // Update profile info
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileEmail').textContent = profile.email;
    document.getElementById('profileRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    // Update profile picture
    if (profile.profilePic) {
        const picDisplay = document.getElementById('profilePicDisplay');
        picDisplay.innerHTML = `<img src="${profile.profilePic}" alt="Profile" class="profile-pic">`;
    }
    
    // Load profile details
    const detailsContainer = document.getElementById('profileDetails');
    let detailsHTML = '';
    
    if (user.role === 'student') {
        detailsHTML = `
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${profile.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Phone</div>
                <div class="detail-value">${profile.phone}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Department</div>
                <div class="detail-value">${profile.department}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Year</div>
                <div class="detail-value">${profile.year}</div>
            </div>
        `;
    } else {
        detailsHTML = `
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${profile.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Phone</div>
                <div class="detail-value">${profile.phone}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Department</div>
                <div class="detail-value">${profile.department}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Position</div>
                <div class="detail-value">${profile.position}</div>
            </div>
        `;
    }
    
    detailsContainer.innerHTML = detailsHTML;
}

// Load student dashboard
function loadStudentDashboard(user) {
    document.getElementById('studentDashboard').style.display = 'block';
    
    const eventsGrid = document.getElementById('studentEventsGrid');
    const registeredEventIds = user.registeredEvents || [];
    
    if (registeredEventIds.length === 0) {
        showEmptyState(eventsGrid, 'You haven\'t registered for any events yet', '📅');
        return;
    }
    
    const registeredEvents = registeredEventIds
        .map(id => db.getEventById(id))
        .filter(event => event !== undefined);
    
    eventsGrid.innerHTML = registeredEvents.map(event => createEventCard(event)).join('');
    
    // Add click handlers
    eventsGrid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            navigateToEvents(eventId);
        });
    });
}

// Load organizer dashboard
function loadOrganizerDashboard(user) {
    document.getElementById('organizerDashboard').style.display = 'block';

    // Display analytics
    displayOrganizerAnalytics(user.id);

    const eventsGrid = document.getElementById('organizerEventsGrid');
    const createdEventIds = user.createdEvents || [];

    if (createdEventIds.length === 0) {
        showEmptyState(eventsGrid, 'You haven\'t created any events yet', '📅');
        return;
    }

    const createdEvents = createdEventIds
        .map(id => db.getEventById(id))
        .filter(event => event !== undefined);

    eventsGrid.innerHTML = createdEvents.map(event => createOrganizerEventCard(event)).join('');
}

// Display organizer analytics
function displayOrganizerAnalytics(organizerId) {
    const analytics = db.getOrganizerAnalytics(organizerId);

    // Create analytics section if it doesn't exist
    let analyticsSection = document.getElementById('organizerAnalytics');
    if (!analyticsSection) {
        const organizerDashboard = document.getElementById('organizerDashboard');
        analyticsSection = document.createElement('div');
        analyticsSection.id = 'organizerAnalytics';
        analyticsSection.className = 'section-card';
        organizerDashboard.insertBefore(analyticsSection, organizerDashboard.firstChild);
    }

    analyticsSection.innerHTML = `
        <h2>📊 Your Analytics</h2>
        <div class="analytics-grid">
            <div class="analytics-card">
                <div class="analytics-value">${analytics.totalEvents}</div>
                <div class="analytics-label">Total Events</div>
            </div>
            <div class="analytics-card">
                <div class="analytics-value">${analytics.totalRegistrations}</div>
                <div class="analytics-label">Total Registrations</div>
            </div>
            <div class="analytics-card">
                <div class="analytics-value">${analytics.avgRegistrationRate}%</div>
                <div class="analytics-label">Avg Registration Rate</div>
            </div>
            <div class="analytics-card">
                <div class="analytics-value">${analytics.eventsByStatus.upcoming}</div>
                <div class="analytics-label">Upcoming Events</div>
            </div>
        </div>
        <div class="analytics-details">
            <div class="detail-item">
                <span>Ongoing Events:</span>
                <strong>${analytics.eventsByStatus.ongoing}</strong>
            </div>
            <div class="detail-item">
                <span>Completed Events:</span>
                <strong>${analytics.eventsByStatus.completed}</strong>
            </div>
        </div>
    `;
}

// Create event card for organizer with action buttons
function createOrganizerEventCard(event) {
    const spotsLeft = event.maxCapacity - event.registrations.length;
    const isFull = spotsLeft <= 0;
    
    return `
        <div class="event-card dashboard-event-card" data-event-id="${event.id}">
            <div class="event-actions">
                <button class="event-action-btn view-registrations-btn" onclick="viewEventRegistrations('${event.id}'); event.stopPropagation();">
                    👥 ${event.registrations.length}
                </button>
                <button class="event-action-btn edit-btn" onclick="editEvent('${event.id}'); event.stopPropagation();">
                    ✏️ Edit
                </button>
                <button class="event-action-btn delete-btn" onclick="deleteEvent('${event.id}'); event.stopPropagation();">
                    🗑️ Delete
                </button>
            </div>
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
                </div>
            </div>
        </div>
    `;
}

// Setup profile picture upload
function setupProfilePicUpload() {
    const input = document.getElementById('profilePicInput');
    
    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showToast('Image size should be less than 2MB', 'error');
            return;
        }
        
        try {
            const base64 = await fileToBase64(file);
            const success = auth.updateProfilePicture(base64);
            
            if (success) {
                // Update display
                const picDisplay = document.getElementById('profilePicDisplay');
                picDisplay.innerHTML = `<img src="${base64}" alt="Profile" class="profile-pic">`;
                showToast('Profile picture updated!', 'success');
            } else {
                showToast('Failed to update profile picture', 'error');
            }
        } catch (error) {
            showToast('Error uploading image', 'error');
        }
    });
}

// Edit profile
function editProfile() {
    const user = auth.getUserData();
    const profile = user.profile;
    
    let formHTML = '';
    
    if (user.role === 'student') {
        formHTML = `
            <div class="profile-edit-form">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" id="editName" class="form-input" value="${profile.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="editEmail" class="form-input" value="${profile.email}">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="tel" id="editPhone" class="form-input" value="${profile.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label">Department</label>
                    <input type="text" id="editDepartment" class="form-input" value="${profile.department}">
                </div>
                <div class="form-group">
                    <label class="form-label">Year</label>
                    <input type="text" id="editYear" class="form-input" value="${profile.year}">
                </div>
                <div class="form-group">
                    <label class="form-label">Bio</label>
                    <textarea id="editBio" class="form-textarea">${profile.bio}</textarea>
                </div>
            </div>
        `;
    } else {
        formHTML = `
            <div class="profile-edit-form">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" id="editName" class="form-input" value="${profile.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="editEmail" class="form-input" value="${profile.email}">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="tel" id="editPhone" class="form-input" value="${profile.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label">Department</label>
                    <input type="text" id="editDepartment" class="form-input" value="${profile.department}">
                </div>
                <div class="form-group">
                    <label class="form-label">Position</label>
                    <input type="text" id="editPosition" class="form-input" value="${profile.position}">
                </div>
                <div class="form-group">
                    <label class="form-label">Bio</label>
                    <textarea id="editBio" class="form-textarea">${profile.bio}</textarea>
                </div>
            </div>
        `;
    }
    
    showModal('Edit Profile', formHTML, []);
    
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
            <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        `;
    }
}

// Save profile changes
function saveProfile() {
    const updates = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        department: document.getElementById('editDepartment').value,
        bio: document.getElementById('editBio').value
    };
    
    if (auth.isStudent()) {
        updates.year = document.getElementById('editYear').value;
    } else {
        updates.position = document.getElementById('editPosition').value;
    }
    
    const success = auth.updateProfile(updates);
    
    if (success) {
        showToast('Profile updated successfully!', 'success');
        closeModal();
        loadDashboard(); // Reload dashboard
    } else {
        showToast('Failed to update profile', 'error');
    }
}

// Logout
function logout() {
    auth.logout();
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
        navigateToHome();
    }, 1000);
}

// View event registrations
function viewEventRegistrations(eventId) {
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

// Show create event form
function showCreateEventForm() {
    const user = auth.getUserData();

    const formHTML = `
        <form id="createEventForm" class="event-form">
            <div class="form-group">
                <label class="form-label">Event Title *</label>
                <input type="text" id="eventTitle" class="form-input" required>
            </div>

            <div class="form-group">
                <label class="form-label">Description *</label>
                <textarea id="eventDescription" class="form-textarea" required></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Date *</label>
                    <input type="date" id="eventDate" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Time *</label>
                    <input type="time" id="eventTime" class="form-input" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Location *</label>
                <input type="text" id="eventLocation" class="form-input" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select id="eventCategory" class="form-select" required>
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Business">Business</option>
                        <option value="Environment">Environment</option>
                        <option value="Sports">Sports</option>
                        <option value="Career">Career</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Max Capacity *</label>
                    <input type="number" id="eventCapacity" class="form-input" min="1" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Status *</label>
                <select id="eventStatus" class="form-select" required>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Image URL</label>
                <input type="text" id="eventImage" class="form-input" placeholder="https://...">
                <p class="form-help">Leave empty for default image</p>
            </div>

            <div class="form-group">
                <label class="form-label">Tags (comma-separated)</label>
                <input type="text" id="eventTags" class="form-input" placeholder="Technology, Innovation, Workshop">
            </div>
        </form>
    `;

    showModal('Create New Event', formHTML, []);

    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="createEvent()">Create Event</button>
            <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        `;
    }
}

// Create event
function createEvent() {
    const form = document.getElementById('createEventForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const user = auth.getUserData();
    const timeValue = document.getElementById('eventTime').value;
    const [hours, minutes] = timeValue.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;

    const tagsInput = document.getElementById('eventTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    const imageUrl = document.getElementById('eventImage').value ||
                     `https://via.placeholder.com/400x250/${Math.random() > 0.5 ? 'FF6B35' : '00A8E8'}/FFFFFF?text=${encodeURIComponent(document.getElementById('eventTitle').value)}`;

    const newEvent = {
        id: generateId('evt'),
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        date: document.getElementById('eventDate').value,
        time: formattedTime,
        location: document.getElementById('eventLocation').value,
        category: document.getElementById('eventCategory').value,
        organizer: user.id,
        organizerName: user.profile.name,
        status: document.getElementById('eventStatus').value,
        image: imageUrl,
        registrations: [],
        maxCapacity: parseInt(document.getElementById('eventCapacity').value),
        tags: tags
    };

    db.addEvent(newEvent);

    // Add to user's created events
    if (!user.createdEvents) user.createdEvents = [];
    user.createdEvents.push(newEvent.id);
    db.updateUser(user.id, user);

    showToast('Event created successfully!', 'success');
    closeModal();
    loadDashboard(); // Reload dashboard
}

// Edit event
function editEvent(eventId) {
    const event = db.getEventById(eventId);
    if (!event) return;

    // Convert time back to 24-hour format for input
    const timeMatch = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hour = parseInt(timeMatch[1]);
    const minute = timeMatch[2];
    const ampm = timeMatch[3].toUpperCase();

    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const time24 = `${hour.toString().padStart(2, '0')}:${minute}`;

    const formHTML = `
        <form id="editEventForm" class="event-form">
            <div class="form-group">
                <label class="form-label">Event Title *</label>
                <input type="text" id="eventTitle" class="form-input" value="${event.title}" required>
            </div>

            <div class="form-group">
                <label class="form-label">Description *</label>
                <textarea id="eventDescription" class="form-textarea" required>${event.description}</textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Date *</label>
                    <input type="date" id="eventDate" class="form-input" value="${event.date}" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Time *</label>
                    <input type="time" id="eventTime" class="form-input" value="${time24}" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Location *</label>
                <input type="text" id="eventLocation" class="form-input" value="${event.location}" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select id="eventCategory" class="form-select" required>
                        <option value="Technology" ${event.category === 'Technology' ? 'selected' : ''}>Technology</option>
                        <option value="Cultural" ${event.category === 'Cultural' ? 'selected' : ''}>Cultural</option>
                        <option value="Business" ${event.category === 'Business' ? 'selected' : ''}>Business</option>
                        <option value="Environment" ${event.category === 'Environment' ? 'selected' : ''}>Environment</option>
                        <option value="Sports" ${event.category === 'Sports' ? 'selected' : ''}>Sports</option>
                        <option value="Career" ${event.category === 'Career' ? 'selected' : ''}>Career</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Max Capacity *</label>
                    <input type="number" id="eventCapacity" class="form-input" value="${event.maxCapacity}" min="1" required>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Status *</label>
                <select id="eventStatus" class="form-select" required>
                    <option value="upcoming" ${event.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                    <option value="ongoing" ${event.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                    <option value="completed" ${event.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Image URL</label>
                <input type="text" id="eventImage" class="form-input" value="${event.image}">
            </div>

            <div class="form-group">
                <label class="form-label">Tags (comma-separated)</label>
                <input type="text" id="eventTags" class="form-input" value="${event.tags ? event.tags.join(', ') : ''}">
            </div>
        </form>
    `;

    showModal('Edit Event', formHTML, []);

    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="saveEventChanges('${eventId}')">Save Changes</button>
            <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        `;
    }
}

// Save event changes
function saveEventChanges(eventId) {
    const form = document.getElementById('editEventForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const timeValue = document.getElementById('eventTime').value;
    const [hours, minutes] = timeValue.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;

    const tagsInput = document.getElementById('eventTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    const updates = {
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        date: document.getElementById('eventDate').value,
        time: formattedTime,
        location: document.getElementById('eventLocation').value,
        category: document.getElementById('eventCategory').value,
        status: document.getElementById('eventStatus').value,
        image: document.getElementById('eventImage').value,
        maxCapacity: parseInt(document.getElementById('eventCapacity').value),
        tags: tags
    };

    const success = db.updateEvent(eventId, updates);

    if (success) {
        showToast('Event updated successfully!', 'success');
        closeModal();
        loadDashboard(); // Reload dashboard
    } else {
        showToast('Failed to update event', 'error');
    }
}

// Delete event
function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        return;
    }

    const user = auth.getUserData();

    // Remove from database
    db.deleteEvent(eventId);

    // Remove from user's created events
    user.createdEvents = user.createdEvents.filter(id => id !== eventId);
    db.updateUser(user.id, user);

    showToast('Event deleted successfully', 'info');
    loadDashboard(); // Reload dashboard
}

