# Campus Connect - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server
- Python 3
- Git

---

## 🚀 Step-by-Step Setup

### Step 1: Clone Project
```bash
git clone <repository-url>
cd Campus-Connect
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Setup MySQL Database

**Windows:**
```bash
mysql -u root -p < backend/database/schema.sql
```

**macOS/Linux:**
```bash
mysql -u root -p < backend/database/schema.sql
```

### Step 4: Configure Backend (.env)
Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=campus_connect
DB_PORT=3306
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:8000
```

### Step 5: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

**Expected:**
```
✅ Server running on http://localhost:5000
✅ MySQL Database connected successfully
```

### Step 6: Start Frontend (Terminal 2)
```bash
# From project root
python -m http.server 8000
```

**Expected:**
```
Serving HTTP on :: port 8000
```

### Step 7: Open Browser
Navigate to: **http://localhost:8000**

---

## 🔐 Demo Credentials

### Student
- Username: `student`
- Password: `student123`

### Organizer
- Username: `organizer`
- Password: `organizer123`

---

## 📋 Verification Checklist

- [ ] Node.js installed: `node --version`
- [ ] MySQL running: `mysql -u root -p -e "SHOW DATABASES;"`
- [ ] Backend dependencies installed: `npm list` (in backend folder)
- [ ] .env file configured with MySQL password
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 8000
- [ ] Browser opens http://localhost:8000
- [ ] Can login with demo credentials
- [ ] Can view events, news, clubs

---

## 🔌 Test API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student","password":"student123","role":"student"}'
```

### Get Events
```bash
curl http://localhost:5000/api/events
```

---

## ⚠️ Common Issues & Solutions

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "Access denied for user 'root'"
1. Check MySQL is running
2. Update DB_PASSWORD in .env
3. Verify password is correct

### "Unknown database 'campus_connect'"
```bash
mysql -u root -p < backend/database/schema.sql
```

### "Port 5000 already in use"
Change PORT in backend/.env or kill process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### "Port 8000 already in use"
```bash
python -m http.server 8001
# Then visit http://localhost:8001
```

---

## 📁 Project Structure

```
Campus-Connect/
├── index.html              # Home page
├── pages/                  # Other pages
├── css/                    # Stylesheets
├── js/                     # Frontend JavaScript
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Dependencies
│   ├── .env               # Configuration
│   ├── config/            # Database config
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth middleware
│   └── database/          # Schema
└── README.md              # Full documentation
```

---

## 🎯 What You Can Do

### As Student
- ✅ Browse events, news, clubs
- ✅ Register for events
- ✅ View profile
- ✅ Upload profile picture

### As Organizer
- ✅ Create events with images
- ✅ Edit/delete own events
- ✅ View registrations
- ✅ Create news articles
- ✅ Upload profile picture

---

## 📚 Next Steps

1. **Explore the UI** - Browse events, news, clubs
2. **Test Features** - Register for events, upload images
3. **Check API** - Review backend/README.md
4. **Customize** - Edit colors, add more data
5. **Deploy** - When ready for production

---

## 🔗 Important URLs

- **Frontend:** http://localhost:8000
- **Backend:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health
- **API Docs:** See backend/README.md

---

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Review backend/README.md for API details
3. Check browser console (F12) for errors
4. Check terminal logs for backend errors
5. See troubleshooting section in README.md

---

## ✨ You're All Set!

Your Campus Connect application is now running! 🎉

**Frontend:** http://localhost:8000
**Backend:** http://localhost:5000

Enjoy! 🚀


