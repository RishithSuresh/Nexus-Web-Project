# Campus Connect Backend API

## Overview

This is the backend API for the Campus Connect application - a college event management system built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create MySQL Database

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
1. Open MySQL Workbench or MySQL CLI
2. Run the SQL commands from `database/schema.sql`

### 3. Configure Environment Variables

Edit `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campus_connect
JWT_SECRET=your_secret_key
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "student",
  "password": "password123",
  "role": "student",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "department": "Computer Science"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "student",
  "password": "password123",
  "role": "student"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Events

#### Get All Events
```
GET /api/events
```

#### Get Event by ID
```
GET /api/events/:id
```

#### Create Event (Organizer only)
```
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tech Summit",
  "description": "Annual tech conference",
  "date": "2024-12-15",
  "time": "09:00",
  "location": "Main Hall",
  "category": "Technology",
  "max_capacity": 200,
  "tags": ["tech", "innovation"]
}
```

#### Update Event (Organizer only)
```
PUT /api/events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "ongoing"
}
```

#### Delete Event (Organizer only)
```
DELETE /api/events/:id
Authorization: Bearer <token>
```

#### Register for Event
```
POST /api/events/:id/register
Authorization: Bearer <token>
```

### News

#### Get All News
```
GET /api/news
```

#### Get News by ID
```
GET /api/news/:id
```

#### Create News (Organizer only)
```
POST /api/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Campus News",
  "content": "News content here",
  "category": "General",
  "date": "2024-12-10"
}
```

#### Update News (Organizer only)
```
PUT /api/news/:id
Authorization: Bearer <token>
```

#### Delete News (Organizer only)
```
DELETE /api/news/:id
Authorization: Bearer <token>
```

### Clubs

#### Get All Clubs
```
GET /api/clubs
```

#### Get Club by ID
```
GET /api/clubs/:id
```

#### Join Club
```
POST /api/clubs/:id/join
Authorization: Bearer <token>
```

#### Leave Club
```
POST /api/clubs/:id/leave
Authorization: Bearer <token>
```

### Users

#### Get User Profile
```
GET /api/users/:id
```

#### Update User Profile
```
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "bio": "Student bio"
}
```

#### Get User Notifications
```
GET /api/users/:id/notifications
Authorization: Bearer <token>
```

### Notifications

#### Get All Notifications
```
GET /api/notifications
Authorization: Bearer <token>
```

#### Get Unread Count
```
GET /api/notifications/count/unread
Authorization: Bearer <token>
```

#### Mark as Read
```
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All as Read
```
PUT /api/notifications/read/all
Authorization: Bearer <token>
```

#### Delete Notification
```
DELETE /api/notifications/:id
Authorization: Bearer <token>
```

## Database Schema

### Tables

- **users** - User accounts (students and organizers)
- **events** - Campus events
- **event_registrations** - Student registrations for events
- **news** - Campus news articles
- **clubs** - Student clubs
- **club_members** - Club membership
- **notifications** - User notifications
- **event_tags** - Event tags/categories

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. User logs in with username, password, and role
2. Server returns a JWT token
3. Include token in Authorization header: `Authorization: Bearer <token>`
4. Token expires in 7 days (configurable in .env)

## Error Handling

All endpoints return JSON responses:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## Development

### Project Structure

```
backend/
├── config/
│   └── database.js          # MySQL connection pool
├── middleware/
│   └── auth.js              # JWT verification
├── routes/
│   ├── auth.js              # Authentication endpoints
│   ├── events.js            # Events endpoints
│   ├── news.js              # News endpoints
│   ├── clubs.js             # Clubs endpoints
│   ├── users.js             # Users endpoints
│   └── notifications.js     # Notifications endpoints
├── database/
│   └── schema.sql           # Database schema
├── server.js                # Main server file
├── .env                     # Environment variables
├── package.json             # Dependencies
└── README.md                # This file
```

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Check credentials in .env
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### JWT Token Errors
- Ensure token is included in Authorization header
- Check token hasn't expired
- Verify JWT_SECRET matches in .env

## Next Steps

1. Update frontend to use API endpoints
2. Replace localStorage calls with API calls
3. Store JWT token in localStorage/sessionStorage
4. Add error handling for API failures

## Support

For issues or questions, check the main README.md in the project root.

