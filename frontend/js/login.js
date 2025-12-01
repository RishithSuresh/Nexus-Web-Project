/* ===================================
   LOGIN PAGE SCRIPT
   Handles user authentication
   =================================== */

let selectedRole = 'student';

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (auth.isLoggedIn()) {
        // If already logged in, go to dashboard
        navigateToDashboard();
        return;
    }

    setupRoleSelector();
    setupLoginForm();
});

// Setup role selector
function setupRoleSelector() {
    const roleOptions = document.querySelectorAll('.role-option');
    
    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all
            roleOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update selected role
            selectedRole = option.dataset.role;
        });
    });
}

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Hide previous error
        errorMessage.style.display = 'none';
        
        // Attempt login
        const result = auth.login(username, password);
        
        if (result.success) {
                // Treat `teacher` selection as an organizer account internally
                const expectedRole = selectedRole === 'teacher' ? 'organizer' : selectedRole;
                if (result.user.role !== expectedRole) {
                    errorMessage.textContent = `This account is registered as ${result.user.role}, not ${selectedRole}. Please select the correct role.`;
                    errorMessage.style.display = 'block';
                    auth.logout(); // Logout the user
                    return;
                }

            // If user selected Teacher, mark the session to behave like a student
            if (selectedRole === 'teacher') {
                // Overwrite session role to `student` so UI treats teacher like a student
                try {
                    const session = auth.getCurrentUser ? auth.getCurrentUser() : auth.currentUser;
                    if (session) {
                        session.role = 'student';
                        session.isTeacherSession = true;
                        localStorage.setItem('currentUser', JSON.stringify(session));
                        auth.currentUser = session;
                    }
                } catch (e) {
                    console.warn('Could not adjust teacher session:', e);
                }
            }
            
            // Success - redirect to dashboard
            showToast('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                navigateToDashboard();
            }, 800);
        } else {
            // Show error
            errorMessage.textContent = result.message;
            errorMessage.style.display = 'block';
        }
    });
}

