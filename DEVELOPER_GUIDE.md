# 👨‍💻 Campus Connect - Developer Guide

## Code Structure & Architecture

### File Organization

```
Campus-Connect/
├── index.html              # Entry point - Home page
├── css/                    # All stylesheets
│   ├── main.css           # Core styles, variables, layout
│   ├── loading.css        # Loading screen animations
│   ├── cards.css          # Card components, modals, toasts
│   ├── pages.css          # Page-specific styles
│   └── dashboard.css      # Dashboard-specific styles
├── js/                     # All JavaScript modules
│   ├── data.js            # Database layer (localStorage)
│   ├── auth.js            # Authentication & session
│   ├── ui.js              # UI utilities & helpers
│   ├── home.js            # Home page logic
│   ├── events.js          # Events page logic
│   ├── news.js            # News page logic
│   ├── clubs.js           # Clubs page logic
│   ├── login.js           # Login page logic
│   └── dashboard.js       # Dashboard logic
└── pages/                  # All HTML pages
    ├── events.html
    ├── news.html
    ├── clubs.html
    ├── login.html
    └── dashboard.html
```

---

## 🗄️ Data Layer (data.js)

### Database Class

The `Database` class manages all localStorage operations:

```javascript
const db = new Database();

// Events
db.getEvents()                    // Get all events
db.getEventById(id)              // Get single event
db.addEvent(event)               // Add new event
db.updateEvent(id, updates)      // Update event
db.deleteEvent(id)               // Delete event

// News
db.getNews()                     // Get all news
db.getNewsById(id)              // Get single news

// Clubs
db.getClubs()                    // Get all clubs
db.getClubById(id)              // Get single club

// Users
db.getUsers()                    // Get all users
db.getUserById(id)              // Get single user
db.getUserByUsername(username)   // Get user by username
db.updateUser(id, updates)       // Update user

// Registrations
db.registerForEvent(userId, eventId)      // Register user
db.unregisterFromEvent(userId, eventId)   // Unregister user
```

### Data Models

#### Event Object
```javascript
{
    id: 'evt001',                    // Unique ID
    title: 'Event Title',            // Event name
    description: 'Description...',   // Full description
    date: '2024-11-15',             // YYYY-MM-DD format
    time: '09:00 AM',               // 12-hour format
    location: 'Location',           // Venue
    category: 'Technology',         // Category
    organizer: 'org001',            // Organizer user ID
    organizerName: 'Name',          // Organizer display name
    status: 'upcoming',             // upcoming/ongoing/completed
    image: 'https://...',           // Image URL
    registrations: [],              // Array of user IDs
    maxCapacity: 200,               // Max attendees
    tags: ['Tag1', 'Tag2']         // Array of tags
}
```

#### News Object
```javascript
{
    id: 'news001',
    title: 'News Title',
    summary: 'Brief summary...',
    content: 'Full content...',
    date: '2024-10-25',
    author: 'Author Name',
    category: 'Achievement',
    image: 'https://...',
    tags: ['Tag1', 'Tag2']
}
```

#### Club Object
```javascript
{
    id: 'club001',
    name: 'Club Name',
    description: 'Description...',
    category: 'Technology',
    contact: {
        email: 'email@example.com',
        phone: '(555) 123-4567',
        president: 'President Name',
        advisor: 'Advisor Name'
    },
    members: 150,
    meetingTime: 'Fridays, 4:00 PM',
    location: 'Room 101',
    image: 'https://...'
}
```

#### User Object
```javascript
{
    id: 'stu001',
    username: 'username',
    password: 'password',           // Plain text (demo only!)
    role: 'student',                // student or organizer
    profile: {
        name: 'Full Name',
        email: 'email@example.com',
        phone: '(555) 111-2222',
        department: 'Department',
        year: '3rd Year',           // For students
        position: 'Professor',      // For organizers
        bio: 'Bio text...',
        profilePic: ''              // Base64 image
    },
    registeredEvents: [],           // For students
    createdEvents: [],              // For organizers
    createdAt: '2024-01-15'
}
```

---

## 🔐 Authentication Layer (auth.js)

### Auth Class

```javascript
const auth = new Auth();

// Check authentication
auth.isLoggedIn()           // Returns boolean
auth.isStudent()            // Returns boolean
auth.isOrganizer()          // Returns boolean

// User operations
auth.login(username, password)      // Returns {success, user/message}
auth.logout()                       // Clears session
auth.getCurrentUser()               // Returns current user session
auth.getUserData()                  // Returns full user data from DB

// Profile operations
auth.updateProfile(updates)         // Update profile
auth.updateProfilePicture(base64)   // Update profile picture
```

### Session Storage

Current user stored in localStorage as:
```javascript
{
    id: 'user_id',
    username: 'username',
    role: 'student',
    profile: { /* profile data */ }
}
```

---

## 🎨 UI Layer (ui.js)

### Utility Functions

```javascript
// Date formatting
formatDate(dateString)          // "October 25, 2024"
formatDateShort(dateString)     // "Oct 25, 2024"
isPastDate(dateString)          // Boolean
isToday(dateString)             // Boolean

// Card creation
createEventCard(event)          // Returns HTML string
createNewsCard(news)            // Returns HTML string
createClubCard(club)            // Returns HTML string

// UI components
showToast(message, type)        // Show notification
showModal(title, content, buttons)  // Show modal
closeModal()                    // Close modal

// Filtering
filterItems(items, searchTerm, category)  // Filter array
sortEventsByDate(events)        // Sort events

// Validation
isValidEmail(email)             // Boolean
isValidPhone(phone)             // Boolean

// Utilities
generateId(prefix)              // Generate unique ID
fileToBase64(file)              // Convert file to base64
showLoading(element)            // Show loading spinner
showEmptyState(element, msg)    // Show empty state
```

---

## 🎯 Page-Specific Logic

### Events Page (events.js)

```javascript
// Main functions
loadEvents()                    // Load all events
displayEvents()                 // Render events grid
applyFilters()                  // Apply search/filters
showEventDetails(eventId)       // Show event modal
registerForEvent(eventId)       // Register student
unregisterFromEvent(eventId)    // Unregister student
viewRegistrations(eventId)      // View registrations (organizer)
```

### Dashboard (dashboard.js)

```javascript
// Main functions
loadDashboard()                 // Load dashboard based on role
loadProfile(user)               // Load user profile
loadStudentDashboard(user)      // Load student view
loadOrganizerDashboard(user)    // Load organizer view

// Organizer functions
showCreateEventForm()           // Show create form
createEvent()                   // Create new event
editEvent(eventId)              // Show edit form
saveEventChanges(eventId)       // Save changes
deleteEvent(eventId)            // Delete event
viewEventRegistrations(eventId) // View registrations

// Profile functions
editProfile()                   // Show edit form
saveProfile()                   // Save changes
setupProfilePicUpload()         // Handle image upload
```

---

## 🎨 CSS Architecture

### CSS Variables (main.css)

All colors and spacing defined as CSS variables:

```css
:root {
    /* Colors */
    --primary-color: #6B9BD1;
    --secondary-color: #9B7EBD;
    --accent-color: #F4A6A3;
    --bg-color: #FAFBFC;
    --text-primary: #2C3E50;
    
    /* Spacing */
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
}
```

### Component Classes

```css
/* Buttons */
.btn                    // Base button
.btn-primary           // Primary action
.btn-secondary         // Secondary action
.btn-outline           // Outlined button
.btn-danger            // Delete/remove
.btn-success           // Success action

/* Cards */
.event-card            // Event card
.news-card             // News card
.club-card             // Club card

/* Forms */
.form-group            // Form field wrapper
.form-label            // Field label
.form-input            // Text input
.form-textarea         // Textarea
.form-select           // Select dropdown

/* Layout */
.container             // Max-width container
.section-title         // Section heading
.page-header           // Page header section
```

---

## 🔄 Adding New Features

### Adding a New Page

1. **Create HTML file** in `pages/` folder
2. **Include required CSS:**
   ```html
   <link rel="stylesheet" href="../css/main.css">
   <link rel="stylesheet" href="../css/cards.css">
   <link rel="stylesheet" href="../css/pages.css">
   ```
3. **Include required JS:**
   ```html
   <script src="../js/data.js"></script>
   <script src="../js/auth.js"></script>
   <script src="../js/ui.js"></script>
   <script src="../js/yourpage.js"></script>
   ```
4. **Create JS file** in `js/` folder
5. **Update navigation** in all pages

### Adding a New Data Type

1. **Add sample data** in `data.js`
2. **Add methods** to Database class:
   ```javascript
   getYourData() {
       return this.get('yourdata') || [];
   }
   
   setYourData(data) {
       this.set('yourdata', data);
   }
   ```
3. **Initialize in init()** method
4. **Create UI components** in `ui.js`
5. **Create page logic** in new JS file

---

## 🐛 Debugging Tips

### View localStorage Data

```javascript
// In browser console
localStorage.getItem('events')
localStorage.getItem('users')
localStorage.getItem('currentUser')
```

### Reset Database

```javascript
// In browser console
localStorage.clear()
location.reload()
```

### Check Current User

```javascript
// In browser console
auth.getCurrentUser()
auth.getUserData()
```

---

## 🚀 Performance Tips

1. **Minimize DOM operations** - Build HTML strings, then insert once
2. **Use event delegation** - Attach listeners to parent elements
3. **Cache DOM queries** - Store frequently used elements
4. **Lazy load images** - Use placeholder images
5. **Debounce search** - Add delay to search input

---

## 🔒 Security Notes

⚠️ **This is a demo project!**

- Passwords stored in plain text
- No server-side validation
- No XSS protection
- No CSRF protection
- LocalStorage is not encrypted

**For production:**
- Use proper authentication (JWT, OAuth)
- Hash passwords (bcrypt)
- Validate on server-side
- Sanitize user input
- Use HTTPS
- Implement proper session management

---

## 📝 Code Style Guide

### JavaScript
- Use `const` for constants
- Use `let` for variables
- Use arrow functions where appropriate
- Add comments for complex logic
- Use meaningful variable names

### CSS
- Use CSS variables for colors/spacing
- Mobile-first responsive design
- Use BEM naming where appropriate
- Group related styles together

### HTML
- Semantic HTML5 elements
- Proper indentation
- Descriptive IDs and classes
- Accessibility attributes

---

## 🎓 Learning Path

1. **Beginner:** Understand HTML structure
2. **Intermediate:** Study CSS layouts and animations
3. **Advanced:** Analyze JavaScript modules and data flow
4. **Expert:** Extend with new features

---

Happy coding! 🚀

