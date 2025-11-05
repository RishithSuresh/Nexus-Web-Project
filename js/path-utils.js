/* ===================================
   PATH UTILITIES
   Handles correct path resolution for navigation
   =================================== */

/**
 * Determines if the current page is in the pages folder
 * @returns {boolean} True if current page is in pages folder
 */
function isInPagesFolder() {
    return window.location.pathname.includes('/pages/');
}

/**
 * Gets the correct path to a page based on current location
 * @param {string} pageName - Name of the page (e.g., 'dashboard.html', 'events.html')
 * @returns {string} Correct path to the page
 */
function getPagePath(pageName) {
    if (isInPagesFolder()) {
        // Already in pages folder, use relative path
        return pageName;
    } else {
        // In root folder, need to go to pages folder
        return `pages/${pageName}`;
    }
}

/**
 * Gets the correct path to the home page
 * @returns {string} Correct path to home page
 */
function getHomePath() {
    if (isInPagesFolder()) {
        return '../index.html';
    } else {
        return 'index.html';
    }
}

/**
 * Navigates to a page with correct path resolution
 * @param {string} pageName - Name of the page
 */
function navigateToPage(pageName) {
    window.location.href = getPagePath(pageName);
}

/**
 * Navigates to home page
 */
function navigateToHome() {
    window.location.href = getHomePath();
}

/**
 * Navigates to dashboard
 */
function navigateToDashboard() {
    window.location.href = getPagePath('dashboard.html');
}

/**
 * Navigates to login page
 */
function navigateToLogin() {
    window.location.href = getPagePath('login.html');
}

/**
 * Navigates to events page with optional event ID
 * @param {string} eventId - Optional event ID to open
 */
function navigateToEvents(eventId = null) {
    let path = getPagePath('events.html');
    if (eventId) {
        path += `?event=${eventId}`;
    }
    window.location.href = path;
}

/**
 * Navigates to news page with optional news ID
 * @param {string} newsId - Optional news ID to open
 */
function navigateToNews(newsId = null) {
    let path = getPagePath('news.html');
    if (newsId) {
        path += `?news=${newsId}`;
    }
    window.location.href = path;
}

/**
 * Navigates to clubs page
 */
function navigateToClubs() {
    window.location.href = getPagePath('clubs.html');
}

/**
 * Safely redirects with error handling
 * @param {string} path - Path to redirect to
 * @param {number} delay - Delay in milliseconds before redirect
 */
function safeRedirect(path, delay = 0) {
    if (delay > 0) {
        setTimeout(() => {
            window.location.href = path;
        }, delay);
    } else {
        window.location.href = path;
    }
}

