/* ===================================
   AUTHENTICATION SYSTEM
   Handles login, logout, and session management
   =================================== */

class Auth {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    // Get current logged-in user
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Login user
    login(username, password) {
        const user = db.getUserByUsername(username);
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }
        
        // Store current user (without password)
        const userSession = {
            id: user.id,
            username: user.username,
            role: user.role,
            profile: user.profile
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        this.currentUser = userSession;
        
        return { success: true, user: userSession };
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    // Check if user is student
    isStudent() {
        return this.currentUser && this.currentUser.role === 'student';
    }

    // Check if user is organizer
    isOrganizer() {
        return this.currentUser && this.currentUser.role === 'organizer';
    }

    // Get user's full data from database
    getUserData() {
        if (!this.currentUser) return null;
        return db.getUserById(this.currentUser.id);
    }

    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) return false;
        
        const user = db.getUserById(this.currentUser.id);
        user.profile = { ...user.profile, ...updates };
        
        const success = db.updateUser(this.currentUser.id, user);
        
        if (success) {
            // Update session
            this.currentUser.profile = user.profile;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
        
        return success;
    }

    // Update profile picture (stored as base64)
    updateProfilePicture(base64Image) {
        return this.updateProfile({ profilePic: base64Image });
    }
}

// Initialize global auth instance
const auth = new Auth();

// Update navigation based on auth status
function updateNavigation() {
    const authButton = document.getElementById('authButton');
    if (!authButton) return;
    
    if (auth.isLoggedIn()) {
        authButton.textContent = 'Dashboard';
        authButton.href = 'pages/dashboard.html';
        authButton.classList.remove('login-btn');
        authButton.classList.add('dashboard-btn');
    } else {
        authButton.textContent = 'Login';
        authButton.href = 'pages/login.html';
        authButton.classList.add('login-btn');
        authButton.classList.remove('dashboard-btn');
    }
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavigation);
} else {
    updateNavigation();
}

