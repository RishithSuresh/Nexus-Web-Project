/* ===================================
   HOME PAGE SCRIPT
   Loads and displays events and news on home page
   =================================== */

// Wait for page to fully load before initializing
window.addEventListener('load', () => {
    // Wait for loading screen to finish (3 seconds)
    setTimeout(() => {
        loadHomeEvents();
        loadHomeNews();
        loadRecommendedEvents();
    }, 3100);
});

// Load top 3 upcoming events for home page
function loadHomeEvents() {
    const eventsGrid = document.getElementById('homeEventsGrid');
    if (!eventsGrid) return;
    
    const events = db.getEvents();
    const upcomingEvents = events
        .filter(event => event.status === 'upcoming' || event.status === 'ongoing')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    
    if (upcomingEvents.length === 0) {
        showEmptyState(eventsGrid, 'No upcoming events at the moment', '📅');
        return;
    }
    
    eventsGrid.innerHTML = upcomingEvents.map(event => createEventCard(event)).join('');
    
    // Add click handlers
    eventsGrid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            window.location.href = `pages/events.html?event=${eventId}`;
        });
    });
}

// Load latest 3 news items for home page
function loadHomeNews() {
    const newsGrid = document.getElementById('homeNewsGrid');
    if (!newsGrid) return;
    
    const news = db.getNews();
    const latestNews = news
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    if (latestNews.length === 0) {
        showEmptyState(newsGrid, 'No news available', '📰');
        return;
    }
    
    newsGrid.innerHTML = latestNews.map(item => createNewsCard(item)).join('');
    
    // Add click handlers
    newsGrid.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', () => {
            const newsId = card.dataset.newsId;
            window.location.href = `pages/news.html?news=${newsId}`;
        });
    });
}

// Load recommended events for logged-in students
function loadRecommendedEvents() {
    const recommendedGrid = document.getElementById('recommendedEventsGrid');
    if (!recommendedGrid) return;

    // Only show recommendations for logged-in students
    if (!auth.isLoggedIn() || !auth.isStudent()) {
        recommendedGrid.parentElement.style.display = 'none';
        return;
    }

    const user = auth.getUserData();
    const recommendations = features.getEventRecommendations(user.id, 3);

    if (recommendations.length === 0) {
        showEmptyState(recommendedGrid, 'No recommendations available', '✨');
        return;
    }

    recommendedGrid.innerHTML = recommendations.map(event => {
        const card = createEventCard(event);
        // Add a recommendation badge
        return card.replace('<div class="event-card"', '<div class="event-card recommended-event"');
    }).join('');

    // Add click handlers
    recommendedGrid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            window.location.href = `pages/events.html?event=${eventId}`;
        });
    });
}

