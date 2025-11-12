# Campus Connect - College Event Management System

A modern, fully-functional campus event management system with **Frontend (HTML5, CSS3, Vanilla JavaScript)** and **Backend (Node.js/Express + MySQL)**. Complete full-stack application with authentication, image uploads, and real-time data management.

## 🎨 Features

### Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MySQL with 8 tables
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** LONGBLOB (Base64 encoding)
- **API:** 30+ RESTful endpoints

### Theme & Design
- ✅ Modern UI with vibrant colors (Orange #FF6B35, Cyan #00A8E8, Yellow #FFD60A)
- ✅ Modern clean typography for easy readability
- ✅ Custom unique SVG logo used across all pages
- ✅ Animated login page with gradient background
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
├── index.html                      # Home page
├── css/
│   ├── main.css                   # Main styles and theme
│   ├── loading.css                # Loading screen animations
│   ├── cards.css                  # Card components and modals
│   ├── pages.css                  # Page-specific styles
│   ├── dashboard.css              # Dashboard styles
│   ├── login.css                  # Login page styles
│   └── image-upload.css           # Image upload styles
├── js/
│   ├── data.js                    # Data management (localStorage)
│   ├── auth.js                    # Authentication system
│   ├── ui.js                      # UI utilities and helpers
│   ├── home.js                    # Home page logic
│   ├── events.js                  # Events page logic
│   ├── news.js                    # News page logic
│   ├── clubs.js                   # Clubs page logic
│   ├── login.js                   # Login page logic
│   ├── dashboard.js               # Dashboard logic
│   ├── notifications.js           # Notifications logic
│   ├── file-upload.js             # File upload handling
│   ├── path-utils.js              # Path utilities
│   ├── error-handler.js           # Error handling
│   └── features.js                # Feature utilities
├── pages/
│   ├── events.html                # Events page
│   ├── news.html                  # News page
│   ├── clubs.html                 # Clubs page
│   ├── login.html                 # Login page
│   └── dashboard.html             # Dashboard page
├── backend/
│   ├── server.js                  # Express server
│   ├── package.json               # Node dependencies
│   ├── .env                       # Environment configuration
│   ├── config/
│   │   └── database.js            # MySQL connection pool
│   ├── middleware/
│   │   └── auth.js                # JWT authentication
│   ├── routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   ├── events.js              # Events endpoints
│   │   ├── news.js                # News endpoints
│   │   ├── clubs.js               # Clubs endpoints
│   │   ├── users.js               # Users endpoints
│   │   └── notifications.js       # Notifications endpoints
│   ├── database/
│   │   └── schema.sql             # MySQL database schema
│   └── README.md                  # API documentation
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL Server
- Python 3 (for frontend server)
- Modern web browser

### Installation & Setup

#### Step 1: Clone/Download Project
```bash
git clone <repository-url>
cd Campus-Connect
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 3: Configure MySQL Database

**Option A: Using Command Line**
```bash
# Create database and tables
mysql -u root -p < backend/database/schema.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. File → Open SQL Script
3. Select `backend/database/schema.sql`
4. Execute (Ctrl+Shift+Enter)

#### Step 4: Configure Backend Environment
Edit `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campus_connect
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:8000
```

#### Step 5: Start Backend Server
```bash
cd backend
npm run dev
# Or for production: npm start
```

**Expected Output:**
```
✅ Server running on http://localhost:5000
📝 Environment: development
✅ MySQL Database connected successfully
```

#### Step 6: Start Frontend Server (New Terminal)
```bash
# From project root directory
python -m http.server 8000
# Or use any other HTTP server
```

**Expected Output:**
```
Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

#### Step 7: Access Application
Open browser and navigate to: **http://localhost:8000**

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

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
```
POST   /auth/register          # Register new user
POST   /auth/login             # Login user
GET    /auth/me                # Get current user
```

### Events Endpoints
```
GET    /events                 # Get all events
GET    /events/:id             # Get event details
POST   /events                 # Create event (organizer only)
PUT    /events/:id             # Update event (organizer only)
DELETE /events/:id             # Delete event (organizer only)
POST   /events/:id/register    # Register for event
```

### News Endpoints
```
GET    /news                   # Get all news
GET    /news/:id               # Get news details
POST   /news                   # Create news (organizer only)
PUT    /news/:id               # Update news (organizer only)
DELETE /news/:id               # Delete news (organizer only)
```

### Clubs Endpoints
```
GET    /clubs                  # Get all clubs
GET    /clubs/:id              # Get club details
POST   /clubs/:id/join         # Join club
POST   /clubs/:id/leave        # Leave club
```

### Users Endpoints
```
GET    /users/:id              # Get user profile
PUT    /users/:id              # Update profile
GET    /users/:id/notifications # Get notifications
```

### Notifications Endpoints
```
GET    /notifications          # Get all notifications
GET    /notifications/count/unread # Get unread count
PUT    /notifications/:id/read # Mark as read
PUT    /notifications/read/all # Mark all as read
DELETE /notifications/:id      # Delete notification
```

### Health Check
```
GET    /health                 # Check backend status
```

## 📝 Database Schema

### Tables
1. **users** - User accounts (students & organizers)
2. **events** - Campus events with image support
3. **event_registrations** - Student event registrations
4. **news** - Campus news articles with image support
5. **clubs** - Student clubs with image support
6. **club_members** - Club memberships
7. **notifications** - User notifications
8. **event_tags** - Event categorization

### Image Support
All tables support image uploads via LONGBLOB columns:
- **users.profile_pic** - User profile pictures
- **events.image** - Event posters
- **news.image** - News article images
- **clubs.image** - Club logos/banners

Images are stored as Base64-encoded strings.

## 🎯 Role-Based Features

### Students Can:
- ✅ Browse events, news, and clubs
- ✅ Register for events
- ✅ Unregister from events
- ✅ View their registered events
- ✅ Edit their profile
- ✅ Upload profile picture
- ✅ View notifications
- ✅ Search and filter events

### Students Cannot:
- ❌ Create or edit events
- ❌ View event registrations
- ❌ Delete events
- ❌ Create news articles

### Organizers Can:
- ✅ Browse events, news, and clubs
- ✅ Create new events with images
- ✅ Edit their own events
- ✅ Delete their own events
- ✅ View registrations for their events
- ✅ Create news articles with images
- ✅ Edit their profile
- ✅ Upload profile picture
- ✅ View notifications
- ✅ Search and filter events

### Organizers Cannot:
- ❌ Register for events (including their own)
- ❌ Edit or delete other organizers' events
- ❌ Edit or delete other organizers' news

## 🎨 Color Palette

- **Primary Orange:** `#FF6B35`
- **Primary Cyan:** `#00A8E8`
- **Primary Yellow:** `#FFD60A`
- **Login Purple:** `#667eea`
- **Login Violet:** `#764ba2`
- **Background:** `#FAFBFC`
- **Card Background:** `#FFFFFF`
- **Text Primary:** `#2C3E50`
- **Text Secondary:** `#5A6C7D`

## 🔧 Technical Details

### Frontend
- **Language:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 with Flexbox & Grid
- **Storage:** localStorage for session data
- **HTTP Server:** Python or any static server

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **CORS:** Enabled for frontend communication

### Database
- **Type:** MySQL
- **Tables:** 8 (users, events, news, clubs, etc.)
- **Image Storage:** LONGBLOB (Base64 encoded)
- **Relationships:** Foreign keys with cascading deletes
- **Indexes:** Optimized for performance

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

### Responsive Breakpoints
- Desktop: > 768px
- Tablet: 768px
- Mobile: < 768px

## 📱 Features Implemented

### Frontend Features
- ✅ Responsive navigation with mobile menu
- ✅ Search and filter functionality
- ✅ Modal popups for details
- ✅ Toast notifications
- ✅ Form validation
- ✅ Image upload (base64)
- ✅ Role-based access control
- ✅ Session management
- ✅ Profile management
- ✅ Smooth animations and transitions
- ✅ Event registration system
- ✅ Notification system

### Backend Features
- ✅ RESTful API with 30+ endpoints
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ MySQL database integration
- ✅ Image upload support (LONGBLOB)
- ✅ CRUD operations for all resources
- ✅ Error handling and validation
- ✅ CORS protection
- ✅ Connection pooling
- ✅ Password hashing (bcryptjs)

### Database Features
- ✅ 8 normalized tables
- ✅ Foreign key relationships
- ✅ Cascading deletes
- ✅ Indexed columns for performance
- ✅ LONGBLOB for image storage
- ✅ Timestamps for audit trail

## 🐛 Troubleshooting

### Backend Issues

**Error: "Cannot find module 'express'"**
```bash
cd backend
npm install
```

**Error: "Access denied for user 'root'@'localhost'"**
1. Check MySQL is running
2. Update credentials in `backend/.env`
3. Verify MySQL password is correct

**Error: "Unknown database 'campus_connect'"**
```bash
mysql -u root -p < backend/database/schema.sql
```

**Error: "Port 5000 already in use"**
```bash
# Change PORT in backend/.env
# Or kill the process using port 5000
```

### Frontend Issues

**Pages not loading**
- Check frontend server is running on port 8000
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

**API calls failing**
- Verify backend is running on port 5000
- Check CORS_ORIGIN in backend/.env
- Verify JWT token is valid

**Images not uploading**
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, GIF, WebP)
- Check browser console for errors

### Database Issues

**Cannot connect to MySQL**
```bash
# Start MySQL service
net start MySQL80  # Windows
# or
brew services start mysql  # macOS
```

**Tables not created**
```bash
# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"

# Create tables
mysql -u root -p campus_connect < backend/database/schema.sql
```

## 📊 Testing

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student","password":"student123","role":"student"}'
```

### Test Get Events
```bash
curl http://localhost:5000/api/events
```

## 🎓 Educational Use

This project demonstrates:
- Full-stack web development
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Backend: Node.js, Express.js
- Database: MySQL with relationships
- Authentication: JWT tokens
- API Design: RESTful principles
- Image handling: Base64 encoding
- Responsive design: Mobile-first approach
- Component-based architecture
- State management
- Error handling and validation

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with ❤️ using:
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

Full-stack application with modern web technologies!

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in terminal
3. Check browser console (F12)
4. See `backend/README.md` for API documentation

---

**Campus Connect** - Connecting students, events, and opportunities across campus.

**Version:** 2.0 (Full-Stack)
**Last Updated:** November 2025

