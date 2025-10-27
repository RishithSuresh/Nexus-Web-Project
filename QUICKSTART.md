# 🚀 Campus Connect - Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Open the Website
Simply open `index.html` in your web browser. That's it! No installation, no server setup required.

### Step 2: Wait for Loading Screen
You'll see an animated loading screen with the Campus Connect logo. This will automatically disappear after a few seconds.

### Step 3: Explore!
The website is now ready to use with pre-loaded sample data.

---

## 🎯 Quick Demo

### Try as a Student
1. Click **Login** in the navigation bar
2. Select **Student** role
3. Use credentials:
   - Username: `student`
   - Password: `student123`
4. You'll be redirected to the Student Dashboard
5. Try these features:
   - ✅ View your profile
   - ✅ Upload a profile picture
   - ✅ Browse events and register
   - ✅ View your registered events in dashboard

### Try as an Organizer
1. Logout (if logged in)
2. Click **Login** again
3. Select **Organizer** role
4. Use credentials:
   - Username: `organizer`
   - Password: `organizer123`
5. You'll be redirected to the Organizer Dashboard
6. Try these features:
   - ✅ Create a new event
   - ✅ Edit your events
   - ✅ View registrations
   - ✅ Delete events

---

## 📱 Main Features to Test

### 🏠 Home Page
- View college information
- See upcoming events (top 3)
- Read latest news (top 3)
- Use quick access links

### 📅 Events Page
- Browse all events
- Use search bar to find events
- Filter by category (Technology, Cultural, Business, etc.)
- Filter by status (Ongoing, Upcoming)
- Click any event card to see full details
- Register for events (when logged in as student)

### 📰 News Page
- Read all campus news
- Search for specific news
- Filter by category
- Click to read full articles

### 🎯 Clubs Page
- Browse student clubs
- Search for clubs
- Filter by category
- View contact information

### 👤 Dashboard (Student)
- View and edit profile
- Upload profile picture
- See all registered events
- Unregister from events

### 👨‍💼 Dashboard (Organizer)
- View and edit profile
- Create new events
- Edit existing events
- View event registrations
- Delete events

---

## 🎨 Customization Tips

### Change College Information
Edit `index.html` lines 95-98:
```html
<h1 class="hero-title">Welcome to Campus Connect</h1>
<p class="hero-tagline">Your Gateway to Campus Life & Opportunities</p>
<p class="hero-location">📍 Silicon Valley University, California</p>
```

### Change Color Theme
Edit `css/main.css` lines 9-20 (CSS Variables):
```css
--primary-color: #6B9BD1;  /* Change this for main color */
--secondary-color: #9B7EBD; /* Change this for accent color */
```

### Add More Sample Data
Edit `js/data.js`:
- Add events to `SAMPLE_EVENTS` array (line 15)
- Add news to `SAMPLE_NEWS` array (line 85)
- Add clubs to `SAMPLE_CLUBS` array (line 145)
- Add users to `SAMPLE_USERS` array (line 185)

---

## 🔧 Troubleshooting

### Problem: Data not loading
**Solution:** Clear browser cache and localStorage:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page

### Problem: Login not working
**Solution:** Make sure you're using the correct credentials:
- Student: `student` / `student123`
- Organizer: `organizer` / `organizer123`

### Problem: Images not showing
**Solution:** The project uses placeholder images from `via.placeholder.com`. Make sure you have an internet connection.

### Problem: Profile picture not uploading
**Solution:** 
- Make sure image is less than 2MB
- Use common formats (JPG, PNG, GIF)
- Images are stored as base64 in localStorage

---

## 📊 Sample Data Included

### Events: 6 Events
1. Tech Innovation Summit 2024
2. Annual Cultural Fest
3. Startup Pitch Competition
4. Environmental Awareness Workshop
5. Sports Championship Finals
6. Career Fair 2024

### News: 4 Articles
1. University Ranks in Top 50 Nationally
2. New AI Research Lab Inaugurated
3. Student Team Wins International Hackathon
4. Campus Sustainability Initiative Launched

### Clubs: 3 Clubs
1. Coding Club
2. Drama Society
3. Entrepreneurship Cell

### Users: 3 Users
1. Student (student/student123)
2. Organizer 1 (organizer/organizer123)
3. Organizer 2 (organizer2/organizer123)

---

## 💡 Pro Tips

1. **Mobile Testing:** Resize your browser window to see responsive design in action
2. **Multiple Accounts:** Open in incognito/private mode to test multiple accounts simultaneously
3. **Data Persistence:** All changes are saved in localStorage and persist across sessions
4. **Reset Data:** Clear localStorage to reset to original sample data
5. **Event Registration:** Students can register for multiple events
6. **Event Management:** Organizers can only edit/delete their own events

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Pure HTML5, CSS3, JavaScript (no frameworks)
- ✅ LocalStorage for data persistence
- ✅ Responsive design with CSS Grid and Flexbox
- ✅ CSS animations and transitions
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Form validation
- ✅ Role-based access control
- ✅ CRUD operations
- ✅ Modal dialogs
- ✅ Toast notifications
- ✅ Image upload (base64)
- ✅ Search and filter functionality

---

## 📞 Need Help?

Check the full `README.md` for detailed documentation on:
- Project structure
- Adding/editing data
- Technical details
- Browser compatibility
- And more!

---

**Enjoy using Campus Connect!** 🎉

Built with ❤️ using only HTML, CSS, and JavaScript.

