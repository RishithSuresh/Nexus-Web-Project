/* ===================================
   TEACHER DASHBOARD (Student-like)
   This page intentionally mirrors the student dashboard behavior so
   teachers see the same view as students (registered events list).
   It reuses shared helpers: createEventCard, showEmptyState, loadProfile, navigateToEvents, setupProfilePicUpload.
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (!auth.isLoggedIn()) {
        navigateToLogin();
        return;
    }

    const user = auth.getUserData();
    if (!user) return navigateToLogin();

    document.getElementById('welcomeMessage').textContent = `Welcome, ${user.profile.name}!`;
    document.getElementById('roleMessage').textContent = `Teacher Dashboard`;

    loadProfile(user);
    setupProfilePicUpload();
    loadTeacherAsStudentView(user);
});

function loadTeacherAsStudentView(user) {
    const eventsGrid = document.getElementById('teacherEventsGrid');

    // Use the same logic as student: show events the user is registered for
    const registeredEventIds = user.registeredEvents || [];

    if (registeredEventIds.length === 0) {
        showEmptyState(eventsGrid, "You haven't registered for any events yet", '📅');
        return;
    }

    const registeredEvents = registeredEventIds
        .map(id => db.getEventById(id))
        .filter(event => event !== undefined);

    if (!registeredEvents || registeredEvents.length === 0) {
        showEmptyState(eventsGrid, "You haven't registered for any events yet", '📅');
        return;
    }

    eventsGrid.innerHTML = registeredEvents.map(event => createEventCard(event)).join('');

    // Add click handlers to navigate to event detail
    eventsGrid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            navigateToEvents(eventId);
        });
    });
}
