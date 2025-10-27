# 📑 Campus Connect - Complete File Index

## 📖 Documentation Files

### README.md
**Purpose:** Complete project documentation  
**Contains:**
- Project overview and features
- Installation instructions
- Demo credentials
- How to add/edit data
- Technical details
- Browser compatibility

### QUICKSTART.md
**Purpose:** Quick start guide for users  
**Contains:**
- 3-step getting started
- Demo walkthrough (Student & Organizer)
- Main features to test
- Customization tips
- Troubleshooting
- Sample data list

### DEVELOPER_GUIDE.md
**Purpose:** Technical guide for developers  
**Contains:**
- Code structure & architecture
- Data layer documentation
- Authentication layer
- UI layer utilities
- Page-specific logic
- CSS architecture
- Adding new features
- Debugging tips
- Security notes

### PROJECT_SUMMARY.md
**Purpose:** Project completion overview  
**Contains:**
- Completion status (100%)
- Requirements checklist
- Implementation details
- Statistics
- File structure
- Technical stack

### INDEX_OF_FILES.md
**Purpose:** This file - Complete file index  
**Contains:**
- All files with descriptions
- File purposes and contents
- Quick reference guide

---

## 🌐 HTML Files

### index.html
**Purpose:** Home page / Entry point  
**Contains:**
- Loading screen with animated logo
- Navigation bar
- Hero section with college info
- Quick access links (4 cards)
- Top 3 upcoming events
- Latest 3 news items
- Footer
**Scripts:** data.js, auth.js, ui.js, home.js  
**Styles:** main.css, loading.css, cards.css

### pages/events.html
**Purpose:** Events listing and management  
**Contains:**
- Navigation bar
- Page header
- Search and filter bar (category, status)
- Events grid (all events)
- Footer
**Scripts:** data.js, auth.js, ui.js, events.js  
**Styles:** main.css, cards.css, pages.css

### pages/news.html
**Purpose:** News articles listing  
**Contains:**
- Navigation bar
- Page header
- Search and filter bar (category)
- News grid (all articles)
- Footer
**Scripts:** data.js, auth.js, ui.js, news.js  
**Styles:** main.css, cards.css, pages.css

### pages/clubs.html
**Purpose:** Student clubs directory  
**Contains:**
- Navigation bar
- Page header
- Search and filter bar (category)
- Clubs grid (all clubs)
- Footer
**Scripts:** data.js, auth.js, ui.js, clubs.js  
**Styles:** main.css, cards.css, pages.css

### pages/login.html
**Purpose:** User authentication  
**Contains:**
- Navigation bar
- Role selector (Student/Organizer)
- Login form
- Demo credentials display
- Footer
**Scripts:** data.js, auth.js, ui.js, login.js  
**Styles:** main.css, pages.css

### pages/dashboard.html
**Purpose:** User dashboard (Student & Organizer)  
**Contains:**
- Navigation bar
- Dashboard header with welcome message
- Profile section with photo upload
- Student view: Registered events
- Organizer view: Created events with management
- Footer
**Scripts:** data.js, auth.js, ui.js, dashboard.js  
**Styles:** main.css, cards.css, pages.css, dashboard.css

---

## 🎨 CSS Files

### css/main.css
**Purpose:** Core styles and theme  
**Contains:**
- CSS variables (colors, spacing, transitions)
- Reset and base styles
- Typography
- Buttons
- Navigation bar
- Hero section
- Quick links
- Footer
- Responsive breakpoints
**Lines:** ~300

### css/loading.css
**Purpose:** Loading screen animations  
**Contains:**
- Loading screen overlay
- Logo animations (building, windows, circles, lines)
- Text fade-in
- Spinner animation
- Fade-out transition
**Lines:** ~150

### css/cards.css
**Purpose:** Card components and UI elements  
**Contains:**
- Event cards
- News cards
- Club cards
- Badges (status, full, registered)
- Modal dialogs
- Toast notifications
- Loading spinners
- Empty states
**Lines:** ~300

### css/pages.css
**Purpose:** Page-specific styles  
**Contains:**
- Page headers
- Search and filter bars
- Form styles (inputs, textareas, selects)
- Login page styles
- Dashboard styles
- Profile sections
- Responsive adjustments
**Lines:** ~250

### css/dashboard.css
**Purpose:** Dashboard-specific styles  
**Contains:**
- Event detail modal styles
- News detail modal styles
- Registrations table
- Event form styles
- Event action buttons
- Profile edit form
**Lines:** ~150

---

## 💻 JavaScript Files

### js/data.js
**Purpose:** Data management and localStorage database  
**Contains:**
- Sample data (events, news, clubs, users)
- Database class with CRUD operations
- Event methods (get, add, update, delete)
- News methods
- Clubs methods
- Users methods
- Registration methods
**Lines:** ~350
**Key Functions:**
- `db.getEvents()` - Get all events
- `db.addEvent(event)` - Add new event
- `db.registerForEvent(userId, eventId)` - Register user

### js/auth.js
**Purpose:** Authentication and session management  
**Contains:**
- Auth class
- Login/logout functionality
- Session storage
- Role checking (student/organizer)
- Profile updates
- Navigation updates
**Lines:** ~100
**Key Functions:**
- `auth.login(username, password)` - Login user
- `auth.isLoggedIn()` - Check if logged in
- `auth.isStudent()` - Check if student

### js/ui.js
**Purpose:** UI utilities and helper functions  
**Contains:**
- Date formatting functions
- Card creation functions
- Modal functions
- Toast notifications
- Filter functions
- Validation functions
- Utility functions
**Lines:** ~250
**Key Functions:**
- `createEventCard(event)` - Create event card HTML
- `showModal(title, content)` - Show modal dialog
- `showToast(message, type)` - Show notification

### js/home.js
**Purpose:** Home page logic  
**Contains:**
- Load top 3 events
- Load latest 3 news
- Display on home page
**Lines:** ~50
**Key Functions:**
- `loadHomeEvents()` - Load events for home
- `loadHomeNews()` - Load news for home

### js/events.js
**Purpose:** Events page logic  
**Contains:**
- Load all events
- Search and filter functionality
- Event details modal
- Registration/unregistration
- View registrations (organizers)
**Lines:** ~250
**Key Functions:**
- `loadEvents()` - Load all events
- `showEventDetails(eventId)` - Show event modal
- `registerForEvent(eventId)` - Register for event

### js/news.js
**Purpose:** News page logic  
**Contains:**
- Load all news
- Search and filter functionality
- News details modal
**Lines:** ~100
**Key Functions:**
- `loadNews()` - Load all news
- `showNewsDetails(newsId)` - Show news modal

### js/clubs.js
**Purpose:** Clubs page logic  
**Contains:**
- Load all clubs
- Search and filter functionality
**Lines:** ~60
**Key Functions:**
- `loadClubs()` - Load all clubs
- `applyFilters()` - Filter clubs

### js/login.js
**Purpose:** Login page logic  
**Contains:**
- Role selector functionality
- Login form handling
- Validation
- Redirect to dashboard
**Lines:** ~70
**Key Functions:**
- `setupRoleSelector()` - Handle role selection
- `setupLoginForm()` - Handle login submission

### js/dashboard.js
**Purpose:** Dashboard logic (Student & Organizer)  
**Contains:**
- Load dashboard based on role
- Profile management
- Student: View registered events
- Organizer: Create/edit/delete events
- Profile picture upload
- View registrations
**Lines:** ~670
**Key Functions:**
- `loadDashboard()` - Load dashboard
- `createEvent()` - Create new event
- `editEvent(eventId)` - Edit event
- `deleteEvent(eventId)` - Delete event

---

## 📊 File Statistics

### Total Files: 24
- HTML: 6 files
- CSS: 5 files
- JavaScript: 9 files
- Documentation: 4 files

### Total Lines of Code: ~3,500+
- HTML: ~1,000 lines
- CSS: ~1,150 lines
- JavaScript: ~1,350 lines

### File Sizes (Approximate)
- Largest JS: dashboard.js (~670 lines)
- Largest CSS: main.css (~300 lines)
- Largest HTML: index.html (~250 lines)

---

## 🔗 File Dependencies

### Every HTML page includes:
1. `css/main.css` - Core styles
2. `js/data.js` - Database
3. `js/auth.js` - Authentication
4. `js/ui.js` - UI utilities

### Additional dependencies by page:
- **index.html:** loading.css, cards.css, home.js
- **events.html:** cards.css, pages.css, events.js
- **news.html:** cards.css, pages.css, news.js
- **clubs.html:** cards.css, pages.css, clubs.js
- **login.html:** pages.css, login.js
- **dashboard.html:** cards.css, pages.css, dashboard.css, dashboard.js

---

## 🎯 Quick Reference

### To modify colors:
→ Edit `css/main.css` (CSS variables)

### To add events:
→ Edit `js/data.js` (SAMPLE_EVENTS array)

### To add news:
→ Edit `js/data.js` (SAMPLE_NEWS array)

### To add clubs:
→ Edit `js/data.js` (SAMPLE_CLUBS array)

### To add users:
→ Edit `js/data.js` (SAMPLE_USERS array)

### To modify navigation:
→ Edit navigation section in each HTML file

### To change college info:
→ Edit `index.html` (hero section)

### To reset database:
→ Browser console: `localStorage.clear()`

---

## 📁 Recommended Reading Order

### For Users:
1. QUICKSTART.md
2. README.md

### For Developers:
1. README.md
2. PROJECT_SUMMARY.md
3. DEVELOPER_GUIDE.md
4. INDEX_OF_FILES.md (this file)

### For Learning:
1. Start with HTML files (structure)
2. Study CSS files (styling)
3. Analyze JS files (functionality)
4. Read DEVELOPER_GUIDE.md (architecture)

---

**Last Updated:** 2024-10-27  
**Project Status:** Complete ✅  
**Version:** 1.0.0

