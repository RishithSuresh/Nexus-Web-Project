/* ===================================
   LOGIN PAGE SCRIPT
   Handles user authentication
   =================================== */

let selectedRole = 'student';

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (auth.isLoggedIn()) {
        window.location.href = 'dashboard.html';
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
            // Check if role matches
            if (result.user.role !== selectedRole) {
                errorMessage.textContent = `This account is registered as ${result.user.role}, not ${selectedRole}. Please select the correct role.`;
                errorMessage.style.display = 'block';
                auth.logout(); // Logout the user
                return;
            }
            
            // Success - redirect to dashboard
            showToast('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Show error
            errorMessage.textContent = result.message;
            errorMessage.style.display = 'block';
        }
    });
}

