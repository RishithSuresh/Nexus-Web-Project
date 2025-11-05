# Debugging Event Editing - Step by Step Guide

## 🔍 How to Debug the Event Editing Issue

### Step 1: Open Browser Developer Tools
1. Open your browser (Chrome, Firefox, Safari, or Edge)
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Keep this open while testing

### Step 2: Login as Organizer
1. Navigate to http://localhost:8000
2. Click "Login"
3. Use organizer credentials:
   - Email: `organizer@campus.edu`
   - Password: `password123`
4. Click "Dashboard"

### Step 3: Create a Test Event (if needed)
1. Click "+ Create Event"
2. Fill in the form:
   - Title: "Test Event"
   - Description: "This is a test event"
   - Date: Pick any future date
   - Time: Pick any time
   - Location: "Test Location"
   - Category: "Technology"
   - Capacity: "50"
   - Status: "Upcoming"
3. Click "Create Event"
4. Check console for messages

### Step 4: Test Event Editing
1. Find your created event on the dashboard
2. Click the "✏️ Edit" button
3. **Check Console** - You should see:
   ```
   🔧 editEvent called with eventId: evt_xxxxx
   ✅ Event found: {event object}
   ```

### Step 5: Modify Event Details
1. Change the event title to something different
2. Change the date
3. Change the location
4. Click "Save Changes"

### Step 6: Check Console for Save Messages
You should see these messages in order:
```
💾 saveEventChanges called with eventId: evt_xxxxx
✅ Form found
✅ Event found: {event object}
📝 Updates to apply: {updates object}
🔄 Update result: true
✅ Event updated successfully
📢 Sending notifications to registered students
```

### Step 7: Verify Changes
1. Check if the dashboard reloads
2. Check if the event details have changed
3. Check if a success toast message appears

---

## 🐛 Common Issues and Solutions

### Issue 1: "Form not found" Error
**Console shows:** `❌ Form not found`

**Solution:**
- The form ID might be wrong
- Check that the modal is properly created
- Try refreshing the page and trying again

### Issue 2: "Event not found" Error
**Console shows:** `❌ Event not found: evt_xxxxx`

**Solution:**
- The event ID might be incorrect
- Check that the event exists in the database
- Try creating a new event first

### Issue 3: Form Validation Failed
**Console shows:** `⚠️ Form validation failed`

**Solution:**
- Fill in all required fields (marked with *)
- Make sure date is in the future
- Make sure capacity is a number > 0

### Issue 4: Update Failed
**Console shows:** `❌ Failed to update event` and `🔄 Update result: false`

**Solution:**
- Check the database for errors
- Try refreshing the page
- Check if the event still exists

### Issue 5: Modal Not Appearing
**Console shows:** Nothing happens when clicking Edit

**Solution:**
- Check if JavaScript is enabled
- Try refreshing the page
- Check browser console for JavaScript errors
- Try a different browser

---

## 📊 Expected Console Output

### Successful Edit Flow
```
🔧 editEvent called with eventId: evt_12345
✅ Event found: {title: "Test Event", ...}
💾 saveEventChanges called with eventId: evt_12345
✅ Form found
✅ Event found: {title: "Test Event", ...}
📝 Updates to apply: {title: "Updated Title", ...}
🔄 Update result: true
✅ Event updated successfully
📸 Storing uploaded image
📢 Sending notifications to registered students
```

### Failed Edit Flow
```
🔧 editEvent called with eventId: evt_12345
❌ Event not found: evt_12345
```

---

## 🔧 Debugging Tips

### 1. Check Network Tab
- Open Developer Tools → Network tab
- Perform an action
- Look for any failed requests (red)
- Check the response for errors

### 2. Check Local Storage
- Open Developer Tools → Application tab
- Click "Local Storage"
- Look for "events" key
- Verify your event is there

### 3. Check JavaScript Errors
- Open Developer Tools → Console tab
- Look for any red error messages
- Note the line number and file
- Check that file for issues

### 4. Test in Different Browser
- Try Chrome, Firefox, Safari, or Edge
- If it works in one but not another, it's a browser-specific issue
- Report the browser and version

### 5. Clear Cache and Reload
- Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Select "All time"
- Click "Clear data"
- Reload the page

---

## 📝 What to Report

If the event editing still doesn't work, please provide:

1. **Console Output**
   - Copy all messages from the console
   - Include any error messages

2. **Steps to Reproduce**
   - Exactly what you did
   - What you expected to happen
   - What actually happened

3. **Browser Information**
   - Browser name and version
   - Operating system

4. **Screenshots**
   - Screenshot of the modal
   - Screenshot of the console
   - Screenshot of the error (if any)

---

## ✅ Verification Checklist

After fixing, verify:
- [ ] Edit button appears on events
- [ ] Modal opens when clicking Edit
- [ ] Form fields are populated with current data
- [ ] Can modify event details
- [ ] Can upload new image
- [ ] Save button works
- [ ] Event updates in database
- [ ] Dashboard reloads
- [ ] Success message appears
- [ ] Notifications sent to students

---

## 🎯 Next Steps

1. **Test the debugging steps above**
2. **Check the console for messages**
3. **Report any errors you see**
4. **Provide the console output**

This will help identify exactly where the issue is!


