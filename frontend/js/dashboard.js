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

/* ------------------ News creation for organizers ------------------ */
function showCreateNewsForm() {
    const formHTML = `
        <form id="createNewsForm" class="news-form">
            <div class="form-group">
                <label class="form-label">Title *</label>
                <input type="text" id="newsTitle" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">Summary *</label>
                <input type="text" id="newsSummary" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">Content *</label>
                <textarea id="newsContent" class="form-textarea" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" id="newsDate" class="form-input">
            </div>

            ${createImageUploadHTML('newsImageUpload', 'newsImagePreview')}

            <div class="form-group">
                <label class="form-label">Category</label>
                <input type="text" id="newsCategory" class="form-input" placeholder="e.g., Announcement">
            </div>

            <div class="form-group">
                <label class="form-label">Tags (comma-separated)</label>
                <input type="text" id="newsTags" class="form-input" placeholder="campus,announcement">
            </div>
        </form>
    `;

    showModal('Publish News', formHTML, []);

    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = `
            <button class="btn btn-primary" onclick="createNews()">Publish</button>
            <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        `;
    }

    // Setup image upload handler
    setTimeout(() => {
        setupImageUploadHandler('newsImageUpload', (base64) => {
            // preview handled by handler
        });
    }, 50);
}

function createNews() {
    const form = document.getElementById('createNewsForm');
    if (!form) return showToast('Form not found', 'error');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const user = auth.getUserData();
    const title = document.getElementById('newsTitle').value;
    const summary = document.getElementById('newsSummary').value;
    const content = document.getElementById('newsContent').value;
    const dateVal = document.getElementById('newsDate').value || new Date().toISOString().slice(0,10);
    const category = document.getElementById('newsCategory').value || 'General';
    const tagsInput = document.getElementById('newsTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(t=>t.trim()) : [];

    const uploadedImage = getUploadedImageData('newsImageUpload');

    const newsItem = {
        id: generateId('news'),
        title,
        summary,
        content,
        date: dateVal,
        author: user.profile.name,
        category,
        image: (uploadedImage) ? uploadedImage : (typeof generatePlaceholderDataUrl === 'function' ? generatePlaceholderDataUrl(title || 'News', '9B7EBD') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#9B7EBD"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">' + encodeURIComponent(title || 'News') + '</text></svg>')),
        tags
    };

    db.addNews(newsItem);

    // store uploaded image separately if provided
    if (uploadedImage) {
        storeNewsImage(newsItem.id, uploadedImage);
    }

    // Attempt to persist to backend (development bypass with author info)
    (async () => {
        try {
            const payload = {
                title: newsItem.title,
                content: newsItem.content,
                category: newsItem.category,
                image: newsItem.image,
                date: newsItem.date,
                // include author info for development bypass
                author_id: auth.getUserData().id,
                author_name: auth.getUserData().profile.name,
                tags: newsItem.tags
            };

            const backendUrl = (window.location.hostname === 'localhost') ? 'http://localhost:5000/api/news' : '/api/news';

            const resp = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                const data = await resp.json().catch(()=>null);
                if (data && data.newsId) {
                    // update local news id to match backend
                    const oldId = newsItem.id;
                    const newId = data.newsId;
                    const news = db.getNews();
                    const idx = news.findIndex(n => n.id === oldId);
                    if (idx !== -1) {
                        news[idx].id = newId;
                        db.setNews(news);
                    }
                }
            } else {
                const err = await resp.json().catch(()=>null);
                console.warn('Backend news create failed', err || resp.statusText);
            }
        } catch (error) {
            console.warn('Could not persist news to backend:', error.message);
        }
    })();

    showToast('News published', 'success');
    closeModal();
    // Reload dashboard/news pages
    try { loadDashboard(); } catch(e) {}
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
    const organizerRoot = document.getElementById('organizerDashboard');
    organizerRoot.style.display = 'block';

    // Apply organizer layout wrapper if not present
    if (!organizerRoot.querySelector('.organizer-layout')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'organizer-layout';

        const sidebar = document.createElement('div');
        sidebar.className = 'organizer-sidebar';
        sidebar.innerHTML = `
            <div class="section-card">
                <h3>Quick Actions</h3>
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
                    <button class="btn btn-primary" onclick="showCreateEventForm()">+ Create Event</button>
                    <button class="btn btn-primary" onclick="showCreateNewsForm()">+ Publish News</button>
                    <button class="btn btn-outline" onclick="features.markAllAsRead && features.markAllAsRead(auth.getCurrentUser().id); updateNotificationBadge();">Mark All Notifications Read</button>
                </div>
            </div>
        `;

        const main = document.createElement('div');
        main.className = 'organizer-main';

        // Move existing organizer content into main
        while (organizerRoot.firstChild) {
            main.appendChild(organizerRoot.firstChild);
        }

        wrapper.appendChild(sidebar);
        wrapper.appendChild(main);
        organizerRoot.appendChild(wrapper);
    }

    // Display analytics
    displayOrganizerAnalytics(user.id);

    const eventsGrid = document.getElementById('organizerEventsGrid');
    // Only show events created by this organizer
    const allEvents = db.getEvents();
    const createdEvents = allEvents.filter(e => e.organizer === user.id);
    if (createdEvents.length === 0) {
        showEmptyState(eventsGrid, 'You haven\'t created any events yet', '📅');
    } else {
        eventsGrid.innerHTML = createdEvents.map(event => createOrganizerEventCard(event)).join('');
    }

    // Show only news created by this organizer
    const newsGrid = document.getElementById('organizerNewsGrid');
    if (newsGrid) {
        const allNews = db.getNews();
        const myNews = allNews.filter(n => n.createdBy === user.id);
        if (myNews.length === 0) {
            newsGrid.innerHTML = '<p class="no-news">No news published yet.</p>';
        } else {
            newsGrid.innerHTML = myNews.map(news => `<div class="news-card"><h3>${news.title}</h3><p>${news.summary}</p></div>`).join('');
        }
    }
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
        content += '<table class="registrations-table"><thead><tr><th>Name</th><th>Email</th><th>Department</th><th></th></tr></thead><tbody>';
        registrations.forEach(profile => {
            content += `
                <tr>
                    <td>${profile.name}</td>
                    <td>${profile.email}</td>
                    <td>${profile.department || 'N/A'}</td>
                    <td><button class="event-action-btn remove-btn" onclick="removeAttendee('${eventId}','${profile.email}');">Remove</button></td>
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

            ${createImageUploadHTML('eventImageUpload', 'eventImagePreview')}

            <div class="form-group">
                <label class="form-label">Image URL (Alternative)</label>
                <input type="text" id="eventImage" class="form-input" placeholder="https://...">
                <p class="form-help">Or paste an image URL if you don't want to upload</p>
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
        // Create buttons programmatically to avoid conflicts with global names
        modalFooter.innerHTML = '';

        const createBtn = document.createElement('button');
        createBtn.className = 'btn btn-primary';
        createBtn.type = 'button';
        createBtn.textContent = 'Create Event';
        createBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            createEvent();
            return false;
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-outline';
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            closeModal();
            return false;
        });

        modalFooter.appendChild(createBtn);
        modalFooter.appendChild(cancelBtn);
    }

    // Setup image upload handler with a small delay to ensure DOM is ready
    let uploadedImageData = null;
    setTimeout(() => {
        setupImageUploadHandler('eventImageUpload', (base64) => {
            uploadedImageData = base64;
        });
    }, 100);
}

// Create event
async function createEvent() {
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

    // Get image - prioritize uploaded image over URL
    let imageUrl = null;
    const uploadedImage = getUploadedImageData('eventImageUpload');
    if (uploadedImage) {
        imageUrl = uploadedImage;
    } else {
        const title = document.getElementById('eventTitle').value || 'Event';
        const color = Math.random() > 0.5 ? 'FF6B35' : '00A8E8';
        try {
            imageUrl = document.getElementById('eventImage').value || generatePlaceholderDataUrl(title, color);
        } catch (e) {
            imageUrl = document.getElementById('eventImage').value || 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#${color}"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">${encodeURIComponent(title)}</text></svg>`);
        }
    }

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
        waitlist: [],
        maxCapacity: parseInt(document.getElementById('eventCapacity').value),
        tags: tags
    };

    // Add to local DB first
    db.addEvent(newEvent);

    // Attempt to persist to backend if available.
    // Backend accepts unauthenticated create in development when organizer info is provided in body.
    try {
        const payload = {
            title: newEvent.title,
            description: newEvent.description,
            date: newEvent.date,
            // send time as HH:MM:SS for SQL TIME compatibility
            time: (document.getElementById('eventTime').value || '00:00') + ':00',
            location: newEvent.location,
            category: newEvent.category,
            max_capacity: newEvent.maxCapacity,
            tags: newEvent.tags,
            image: newEvent.image,
            // include organizer info for development bypass
            organizer_id: newEvent.organizer,
            organizer_name: newEvent.organizerName
        };

        // Use relative path; frontend server proxies are not set, so call backend host directly
        const backendUrl = (window.location.hostname === 'localhost') ? 'http://localhost:5000/api/events' : '/api/events';

        const resp = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            const err = await resp.json().catch(()=>null);
            console.warn('Backend event create failed', err || resp.statusText);
        } else {
            // Optionally update local event id to match backend id if backend returned different id
            const data = await resp.json().catch(()=>null);
            if (data && data.eventId) {
                // update local event id mapping and user's createdEvents
                const oldId = newEvent.id;
                const newId = data.eventId;
                const events = db.getEvents();
                const idx = events.findIndex(e => e.id === oldId);
                if (idx !== -1) {
                    events[idx].id = newId;
                    db.setEvents(events);
                }
                // Update user createdEvents list
                const currentUser = auth.getUserData();
                if (currentUser && currentUser.createdEvents) {
                    const ci = currentUser.createdEvents.indexOf(oldId);
                    if (ci !== -1) {
                        currentUser.createdEvents[ci] = newId;
                        db.updateUser(currentUser.id, currentUser);
                        // also update session profile if needed
                        if (auth.currentUser) {
                            auth.currentUser = auth.getCurrentUser();
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.warn('Could not persist event to backend:', error.message);
    }

    // Store uploaded image if exists
    if (uploadedImage) {
        storeEventImage(newEvent.id, uploadedImage);
    }

    // Add to user's created events
    if (!user.createdEvents) user.createdEvents = [];
    user.createdEvents.push(newEvent.id);
    db.updateUser(user.id, user);

    showToast('Event created successfully!', 'success');
    closeModal();
    loadDashboard(); // Reload dashboard
}

// Global variable to store uploaded image data during edit
let editEventUploadedImage = null;

// Edit event
function editEvent(eventId) {
    console.log('🔧 editEvent called with eventId:', eventId);
    const event = db.getEventById(eventId);
    if (!event) {
        console.error('❌ Event not found:', eventId);
        return;
    }
    console.log('✅ Event found:', event);

    // Reset uploaded image data
    editEventUploadedImage = null;

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
                    <option value="cancelled" ${event.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </div>

            ${createImageUploadHTML('eventImageUploadEdit', 'eventImagePreviewEdit', event.image)}

            <div class="form-group">
                <label class="form-label">Image URL (Alternative)</label>
                <input type="text" id="eventImage" class="form-input" value="${event.image}">
                <p class="form-help">Or paste an image URL if you don't want to upload</p>
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

    // Setup image upload handler for edit form with a small delay to ensure DOM is ready
    setTimeout(() => {
        setupImageUploadHandler('eventImageUploadEdit', (base64) => {
            editEventUploadedImage = base64;
        });
    }, 100);
}

// Save event changes
function saveEventChanges(eventId) {
    console.log('💾 saveEventChanges called with eventId:', eventId);
    const form = document.getElementById('editEventForm');
    if (!form) {
        console.error('❌ Form not found');
        showToast('Form not found', 'error');
        return;
    }
    console.log('✅ Form found');

    if (!form.checkValidity()) {
        console.warn('⚠️ Form validation failed');
        form.reportValidity();
        return;
    }

    const event = db.getEventById(eventId);
    if (!event) {
        console.error('❌ Event not found:', eventId);
        showToast('Event not found', 'error');
        return;
    }
    console.log('✅ Event found:', event);

    const timeValue = document.getElementById('eventTime').value;
    const [hours, minutes] = timeValue.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;

    const tagsInput = document.getElementById('eventTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    // Get image - prioritize uploaded image over URL
    let imageUrl = null;
    if (editEventUploadedImage) {
        imageUrl = editEventUploadedImage;
    } else {
        imageUrl = document.getElementById('eventImage').value;
    }

    const updates = {
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        date: document.getElementById('eventDate').value,
        time: formattedTime,
        location: document.getElementById('eventLocation').value,
        category: document.getElementById('eventCategory').value,
        status: document.getElementById('eventStatus').value,
        image: imageUrl,
        maxCapacity: parseInt(document.getElementById('eventCapacity').value),
        tags: tags
    };

    console.log('📝 Updates to apply:', updates);
    const success = db.updateEvent(eventId, updates);
    console.log('🔄 Update result:', success);

    if (success) {
        console.log('✅ Event updated successfully');
        // Store uploaded image if exists
        if (editEventUploadedImage) {
            console.log('📸 Storing uploaded image');
            storeEventImage(eventId, editEventUploadedImage);
        }

        // Detect what changed and send notifications to registered students
        console.log('📢 Sending notifications to registered students');
        notifyRegisteredStudentsOfChanges(eventId, event, updates);

        // Reset uploaded image data
        editEventUploadedImage = null;

        showToast('Event updated successfully!', 'success');
        closeModal();
        loadDashboard(); // Reload dashboard
    } else {
        console.error('❌ Failed to update event');
        showToast('Failed to update event', 'error');
    }
}

// Notify registered students of event changes
function notifyRegisteredStudentsOfChanges(eventId, oldEvent, newUpdates) {
    const event = db.getEventById(eventId);
    if (!event || !event.registrations || event.registrations.length === 0) {
        return; // No registered students
    }

    // Detect what changed
    const changes = [];
    let notificationType = 'event_update';
    let notificationTitle = 'Event Updated';
    let notificationMessage = `${event.title} has been updated`;

    // Check for date change
    if (oldEvent.date !== newUpdates.date) {
        changes.push(`📅 Date changed from ${oldEvent.date} to ${newUpdates.date}`);
        notificationType = 'event_update';
        notificationTitle = 'Event Date Changed';
        notificationMessage = `The date for ${event.title} has been changed to ${newUpdates.date}`;
    }

    // Check for time change
    if (oldEvent.time !== newUpdates.time) {
        changes.push(`🕐 Time changed from ${oldEvent.time} to ${newUpdates.time}`);
        if (!changes.includes('date')) {
            notificationTitle = 'Event Time Changed';
            notificationMessage = `The time for ${event.title} has been changed to ${newUpdates.time}`;
        }
    }

    // Check for location change
    if (oldEvent.location !== newUpdates.location) {
        changes.push(`📍 Location changed from ${oldEvent.location} to ${newUpdates.location}`);
        notificationTitle = 'Event Location Changed';
        notificationMessage = `The location for ${event.title} has been changed to ${newUpdates.location}`;
    }

    // Check for status change
    if (oldEvent.status !== newUpdates.status) {
        changes.push(`Status changed from ${oldEvent.status} to ${newUpdates.status}`);
        if (newUpdates.status === 'cancelled') {
            notificationType = 'event_cancelled';
            notificationTitle = 'Event Cancelled';
            notificationMessage = `${event.title} has been cancelled`;
        } else {
            notificationTitle = 'Event Status Changed';
            notificationMessage = `${event.title} status has been changed to ${newUpdates.status}`;
        }
    }

    // Check for capacity change
    if (oldEvent.maxCapacity !== newUpdates.maxCapacity) {
        changes.push(`Capacity changed from ${oldEvent.maxCapacity} to ${newUpdates.maxCapacity}`);
    }

    // Check for description change
    if (oldEvent.description !== newUpdates.description) {
        changes.push('Description has been updated');
    }

    // Send notifications to all registered students
    if (changes.length > 0) {
        event.registrations.forEach(studentId => {
            if (typeof features !== 'undefined' && features.addNotification) {
                features.addNotification(
                    studentId,
                    notificationType,
                    notificationTitle,
                    notificationMessage,
                    {
                        eventId: eventId,
                        changes: changes,
                        updatedAt: new Date().toISOString()
                    }
                );
            }
        });

        // Log notification sent
        console.log(`✅ Notifications sent to ${event.registrations.length} registered students for event: ${event.title}`);
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

// Remove attendee by email (used by organizer)
function removeAttendee(eventId, attendeeEmail) {
    const event = db.getEventById(eventId);
    if (!event) return showToast('Event not found', 'error');

    // find user by email
    const users = db.getUsers();
    const user = users.find(u => u.profile && u.profile.email === attendeeEmail);
    if (!user) return showToast('Attendee not found', 'error');

    // Remove from event registrations
    event.registrations = event.registrations.filter(id => id !== user.id);
    db.updateEvent(eventId, event);

    // Remove from user's registered events
    if (user.registeredEvents) {
        user.registeredEvents = user.registeredEvents.filter(id => id !== eventId);
        db.updateUser(user.id, user);
    }

    showToast('Attendee removed', 'info');
    // refresh modal content if open
    loadDashboard();
}

