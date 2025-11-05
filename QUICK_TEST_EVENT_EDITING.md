# Quick Test Guide - Event Editing & Notifications

## 🚀 Quick Start Testing (5 minutes)

### Setup
1. Open the application in your browser
2. You should see the login page

---

## Test 1: Basic Event Editing (2 min)

### Steps:
1. **Login as Organizer**
   - Username: `organizer1`
   - Password: `password123`

2. **Go to Dashboard**
   - Click "Dashboard" in navbar

3. **Edit an Event**
   - Find any event card
   - Click the "✏️ Edit" button

4. **Verify Edit Form Opens**
   - ✅ Form shows all current event details
   - ✅ Title field has current title
   - ✅ Date field has current date
   - ✅ Time field has current time
   - ✅ Location field has current location
   - ✅ Image preview shows current image

5. **Make a Change**
   - Change the title to something new
   - Example: "Updated Event Title"

6. **Save Changes**
   - Click "Save Changes" button
   - ✅ Success message appears
   - ✅ Dashboard reloads
   - ✅ Event title is updated

---

## Test 2: Image Upload During Edit (2 min)

### Steps:
1. **Login as Organizer**
   - Username: `organizer1`
   - Password: `password123`

2. **Edit an Event**
   - Click "✏️ Edit" on any event

3. **Upload New Image**
   - Click the upload area (📸)
   - Select an image from your computer
   - ✅ Image preview updates immediately

4. **Save Changes**
   - Click "Save Changes"
   - ✅ Success message appears
   - ✅ New image displays on event card

---

## Test 3: Student Notifications (3 min)

### Setup:
1. **Create a Test Event**
   - Login as Organizer
   - Create a new event
   - Note the event ID

2. **Register as Student**
   - Logout
   - Login as Student: `student1` / `password123`
   - Go to Events page
   - Register for the event you just created
   - ✅ Registration confirmation shown

### Test Notification:
1. **Logout Student**
   - Click logout

2. **Edit Event as Organizer**
   - Login as Organizer
   - Go to Dashboard
   - Click "✏️ Edit" on the event
   - Change the date to tomorrow
   - Click "Save Changes"
   - ✅ Success message shown

3. **Check Student Notifications**
   - Logout Organizer
   - Login as Student
   - ✅ Notification bell shows badge with number
   - Click the bell icon
   - ✅ Notification appears in dropdown
   - ✅ Notification says "Event Date Changed"
   - ✅ Shows old date and new date

---

## Test 4: Multiple Changes Notification (2 min)

### Steps:
1. **Login as Organizer**

2. **Edit Event with Multiple Changes**
   - Click "✏️ Edit" on any event
   - Change: Title, Date, Location, Time
   - Click "Save Changes"

3. **Check Student Notification**
   - Logout
   - Login as Student (registered for event)
   - Click notification bell
   - ✅ Notification shows all changes
   - ✅ Each change listed with emoji
   - Example:
     ```
     📅 Date changed from 2024-11-15 to 2024-11-20
     🕐 Time changed from 09:00 AM to 10:00 AM
     📍 Location changed from Room A to Room B
     ```

---

## Test 5: Event Cancellation Notification (1 min)

### Steps:
1. **Login as Organizer**

2. **Edit Event**
   - Click "✏️ Edit" on any event
   - Change Status to "Cancelled"
   - Click "Save Changes"

3. **Check Student Notification**
   - Logout
   - Login as Student (registered for event)
   - Click notification bell
   - ✅ Notification title: "Event Cancelled"
   - ✅ Message: "Event Title has been cancelled"

---

## Expected Results Summary

| Test | Expected Result | Status |
|------|-----------------|--------|
| Edit Title | Title updates, success shown | ✅ |
| Edit Date | Date updates, notification sent | ✅ |
| Edit Location | Location updates, notification sent | ✅ |
| Upload Image | Image updates, persists | ✅ |
| Student Notification | Notification appears in bell | ✅ |
| Multiple Changes | All changes listed in notification | ✅ |
| Cancellation | Special cancellation notification | ✅ |
| Notification Badge | Badge shows unread count | ✅ |

---

## Troubleshooting

### Issue: Edit form doesn't open
- **Solution:** Refresh the page and try again
- **Check:** Browser console for errors (F12)

### Issue: Image doesn't upload
- **Solution:** Check file size (max 5MB)
- **Solution:** Check file format (JPEG, PNG, GIF, WebP)
- **Check:** Browser console for errors

### Issue: Notification doesn't appear
- **Solution:** Make sure student is registered for event
- **Solution:** Logout and login again to refresh
- **Check:** Notification bell badge count

### Issue: Changes not saved
- **Solution:** Check form validation (all required fields)
- **Solution:** Check browser console for errors
- **Solution:** Try refreshing and editing again

---

## Browser Console Logs

When testing, you should see in browser console (F12):

```
✅ Notifications sent to X registered students for event: Event Title
```

This confirms notifications were sent successfully.

---

## Quick Checklist

- [ ] Can edit event title
- [ ] Can edit event date
- [ ] Can edit event location
- [ ] Can upload new image
- [ ] Image persists after save
- [ ] Student receives notification
- [ ] Notification shows changes
- [ ] Multiple changes work
- [ ] Cancellation notification works
- [ ] Notification badge updates

---

## 🎉 All Tests Passing?

If all tests pass, the feature is working perfectly! ✅


