# Campus Connect - College Event Management System

A modern, fully-functional campus event management website built with **HTML5, CSS3, and Vanilla JavaScript**. No backend server or APIs required - all data is stored locally using localStorage.

## 🎨 Features

### Theme & Design
- ✅ Light UI theme with pale soft colors
- ✅ Modern clean typography for easy readability
- ✅ Custom unique SVG logo used across all pages
- ✅ Animated loading screen with logo animation
- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ Smooth transitions and animations

### Pages & Functionality

#### 🏠 Home Page
- College details (name, location, tagline)
- Quick links to all sections
- Top 3 upcoming events
- Latest 3 news updates

#### 📅 Events Page
- All events displayed as cards
- Events sorted by status (ongoing → upcoming)
- Search and filter functionality (by category and status)
- Click to expand event details in modal
- Register/Unregister functionality for students
- View registrations for organizers

#### 📰 News Page
- Latest college news with thumbnails
- Search and filter by category
- Click to view full news article in modal
- Sorted by date (newest first)

#### 🎯 Clubs Page
- Student clubs and organizations
- Contact information (email, phone, president, advisor)
- Search and filter functionality
- Meeting times and locations

#### 🔐 Login Page
- Role selection (Student / Organizer)
- Demo credentials provided
- Session management with localStorage

#### 👤 Student Dashboard
- Profile management with photo upload
- View and edit profile information
- List of registered events
- Unregister from events

#### 👨‍💼 Organizer Dashboard
- Profile management with photo upload
- Create new events
- Edit existing events
- Delete events
- View event registrations
- Cannot register for own events

## 📁 Project Structure

```
Campus-Connect/
├── index.html              # Home page
├── css/
│   ├── main.css           # Main styles and theme
│   ├── loading.css        # Loading screen animations
│   ├── cards.css          # Card components and modals
│   ├── pages.css          # Page-specific styles
│   └── dashboard.css      # Dashboard styles
├── js/
│   ├── data.js            # Data management & localStorage
│   ├── auth.js            # Authentication system
│   ├── ui.js              # UI utilities and helpers
│   ├── home.js            # Home page logic
│   ├── events.js          # Events page logic
│   ├── news.js            # News page logic
│   ├── clubs.js           # Clubs page logic
│   ├── login.js           # Login page logic
│   └── dashboard.js       # Dashboard logic
├── pages/
│   ├── events.html        # Events page
│   ├── news.html          # News page
│   ├── clubs.html         # Clubs page
│   ├── login.html         # Login page
│   └── dashboard.html     # Dashboard page
└── README.md              # This file
```

## 🚀 Getting Started

### Installation
1. Download or clone this project
2. Open `index.html` in a modern web browser
3. The database will auto-initialize with sample data on first load

### Demo Credentials

**Student Account:**
- Username: `student`
- Password: `student123`

**Organizer Account 1:**
- Username: `organizer`
- Password: `organizer123`

**Organizer Account 2:**
- Username: `organizer2`
- Password: `organizer123`

## 📝 How to Add/Edit Data

### Adding Events
Open `js/data.js` and add to the `SAMPLE_EVENTS` array:

```javascript
{
    id: 'evt007',
    title: 'Your Event Title',
    description: 'Event description...',
    date: '2024-12-10',
    time: '02:00 PM',
    location: 'Event Location',
    category: 'Technology', // Technology, Cultural, Business, Environment, Sports, Career
    organizer: 'org001',
    organizerName: 'Organizer Name',
    status: 'upcoming', // upcoming, ongoing, completed
    image: 'https://via.placeholder.com/400x250/6B9BD1/FFFFFF?text=Event',
    registrations: [],
    maxCapacity: 100,
    tags: ['Tag1', 'Tag2']
}
```

### Adding News
Open `js/data.js` and add to the `SAMPLE_NEWS` array:

```javascript
{
    id: 'news005',
    title: 'News Title',
    summary: 'Brief summary...',
    content: 'Full news content...',
    date: '2024-10-27',
    author: 'Author Name',
    category: 'Achievement', // Achievement, Technology, Environment, Sports, Cultural
    image: 'https://via.placeholder.com/400x250/6B9BD1/FFFFFF?text=News',
    tags: ['Tag1', 'Tag2']
}
```

### Adding Clubs
Open `js/data.js` and add to the `SAMPLE_CLUBS` array:

```javascript
{
    id: 'club004',
    name: 'Club Name',
    description: 'Club description...',
    category: 'Technology', // Technology, Arts, Business, Sports, Social
    contact: {
        email: 'club@campusconnect.edu',
        phone: '(555) 123-4567',
        president: 'President Name',
        advisor: 'Advisor Name'
    },
    members: 100,
    meetingTime: 'Mondays, 5:00 PM',
    location: 'Room 101',
    image: 'https://via.placeholder.com/300x200/6B9BD1/FFFFFF?text=Club'
}
```

### Adding Users
Open `js/data.js` and add to the `SAMPLE_USERS` array:

```javascript
{
    id: 'stu002',
    username: 'newstudent',
    password: 'password123',
    role: 'student', // student or organizer
    profile: {
        name: 'Student Name',
        email: 'student@student.edu',
        phone: '(555) 111-2222',
        department: 'Computer Science',
        year: '2nd Year', // For students
        // position: 'Professor', // For organizers
        bio: 'Bio text...',
        profilePic: ''
    },
    registeredEvents: [], // For students
    // createdEvents: [], // For organizers
    createdAt: '2024-10-27'
}
```

### Resetting Data
To reset all data to default:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page

## 🎯 Role-Based Features

### Students Can:
- ✅ Browse events, news, and clubs
- ✅ Register for events
- ✅ Unregister from events
- ✅ View their registered events
- ✅ Edit their profile
- ✅ Upload profile picture

### Students Cannot:
- ❌ Create or edit events
- ❌ View event registrations
- ❌ Delete events

### Organizers Can:
- ✅ Browse events, news, and clubs
- ✅ Create new events
- ✅ Edit their own events
- ✅ Delete their own events
- ✅ View registrations for their events
- ✅ Edit their profile
- ✅ Upload profile picture

### Organizers Cannot:
- ❌ Register for events (including their own)
- ❌ Edit or delete other organizers' events

## 🎨 Color Palette

- **Primary Blue:** `#6B9BD1`
- **Primary Light:** `#8AB4D5`
- **Secondary Purple:** `#9B7EBD`
- **Accent Pink:** `#F4A6A3`
- **Background:** `#FAFBFC`
- **Card Background:** `#FFFFFF`
- **Text Primary:** `#2C3E50`
- **Text Secondary:** `#5A6C7D`

## 🔧 Technical Details

### Data Storage
- All data stored in browser's localStorage
- Automatic initialization with sample data
- Persistent across sessions
- No backend server required

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

### Responsive Breakpoints
- Desktop: > 768px
- Tablet: 768px
- Mobile: < 768px

## 📱 Features Implemented

- ✅ Loading screen with animated logo
- ✅ Responsive navigation with mobile menu
- ✅ Search and filter functionality
- ✅ Modal popups for details
- ✅ Toast notifications
- ✅ Form validation
- ✅ Image upload (base64)
- ✅ Role-based access control
- ✅ Session management
- ✅ CRUD operations for events
- ✅ Event registration system
- ✅ Profile management
- ✅ Smooth animations and transitions

## 🎓 Educational Use

This project demonstrates:
- Modern CSS techniques (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- DOM manipulation
- Event handling
- Form validation
- Responsive design
- Component-based architecture
- State management
- Authentication flow

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with ❤️ using only HTML5, CSS3, and Vanilla JavaScript.

No frameworks, no libraries, no backend - just pure web technologies!

---

**Campus Connect** - Connecting students, events, and opportunities across campus.

