# Event Image Upload - Quick Start Guide

## 🎯 What's New?

Event organizers can now **upload images directly** when creating or editing events!

## 🚀 How to Use

### Creating an Event with Image

1. **Login as Organizer**
   - Go to Dashboard
   - Click "Create New Event"

2. **Fill Event Details**
   - Title, Description, Date, Time, Location, etc.

3. **Upload Image**
   - Scroll to "Event Image" section
   - Click the upload area (📸 icon)
   - Select image from your computer
   - See preview appear instantly

4. **Alternative: Paste Image URL**
   - If you prefer, paste an image URL instead
   - Uploaded images take priority

5. **Create Event**
   - Click "Create Event" button
   - Image is saved with the event

### Editing Event Image

1. **Go to Dashboard**
   - Click "Edit" on any event you created

2. **Update Image**
   - Upload a new image, OR
   - Keep existing image, OR
   - Paste new image URL

3. **Save Changes**
   - Click "Save Changes"
   - Image is updated

## 📸 Supported Image Formats

✅ **JPEG** (.jpg, .jpeg)
✅ **PNG** (.png)
✅ **GIF** (.gif)
✅ **WebP** (.webp)

## 📏 Image Requirements

- **Maximum Size**: 5MB
- **Recommended Size**: Under 1MB
- **Recommended Dimensions**: 400x250px or similar

## 💾 Where Images Are Stored

- Images are stored in your browser's **localStorage**
- Persists across browser sessions
- Specific to each event
- Automatically managed

## ✨ Features

✅ **Live Preview** - See image before saving
✅ **Drag & Drop** - Drop images directly (coming soon)
✅ **Validation** - Automatic file type and size checking
✅ **Error Messages** - Clear feedback if something goes wrong
✅ **Persistent Storage** - Images saved permanently
✅ **Easy Editing** - Change images anytime

## 🎨 Image Upload Interface

```
┌─────────────────────────────────────────┐
│  Event Image                            │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐ │
│  │              │  │  📸             │ │
│  │   Preview    │  │  Click to       │ │
│  │   Area       │  │  upload image   │ │
│  │              │  │                 │ │
│  └──────────────┘  │  Max 5MB        │ │
│                    │  JPEG, PNG...   │ │
│                    └─────────────────┘ │
├─────────────────────────────────────────┤
│  Image URL (Alternative)                │
│  [https://example.com/image.jpg]        │
│  Or paste an image URL if you don't     │
│  want to upload                         │
└─────────────────────────────────────────┘
```

## 🔧 Technical Details

### Files Added
- `js/file-upload.js` - Upload functionality
- `css/image-upload.css` - Upload styling

### How It Works
1. Select image file
2. File is validated (type, size)
3. Converted to base64 format
4. Stored in browser localStorage
5. Displayed in event cards and details

### Storage
- Each image stored with event ID
- Stored in localStorage as base64
- Survives browser restarts
- Specific to each browser/device

## ⚠️ Important Notes

1. **Browser Storage**: Images stored locally in your browser
2. **Device Specific**: Images don't sync across devices
3. **Storage Limit**: Browser has ~5-10MB localStorage limit
4. **Backup**: Consider backing up important images
5. **Clearing Cache**: Clearing browser cache may delete images

## 🆘 Troubleshooting

### Image Won't Upload
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, GIF, WebP)
- Try different browser
- Clear browser cache

### Image Not Showing
- Refresh the page
- Check browser console for errors
- Verify localStorage is enabled
- Try uploading again

### Upload Too Slow
- Use smaller image file
- Compress image before uploading
- Check internet connection

## 💡 Tips & Tricks

1. **Optimize Images**: Compress images before uploading for faster performance
2. **Consistent Sizing**: Use similar dimensions for all event images
3. **Professional Look**: Use high-quality images for better appearance
4. **Backup Important Images**: Save copies of important event images
5. **Regular Cleanup**: Delete old event images to free storage space

## 🎯 Example Workflow

```
1. Login as Organizer
   ↓
2. Click "Create New Event"
   ↓
3. Fill in event details
   ↓
4. Click upload area
   ↓
5. Select image from computer
   ↓
6. See preview appear
   ↓
7. Click "Create Event"
   ↓
8. Event created with image!
   ↓
9. Image displays in event cards
   ↓
10. Can edit image anytime
```

## 📞 Support

For issues or questions:
1. Check the full guide: `EVENT_IMAGE_UPLOAD_GUIDE.md`
2. Check browser console for error messages
3. Try clearing browser cache
4. Try different browser

## ✅ Checklist

Before uploading images:
- [ ] Image file is under 5MB
- [ ] Image format is JPEG, PNG, GIF, or WebP
- [ ] Image dimensions are reasonable (400x250px+)
- [ ] Image quality is good
- [ ] You have a backup if important

## 🎉 You're Ready!

Start creating events with beautiful images! 📸✨

---

**Need more details?** See `EVENT_IMAGE_UPLOAD_GUIDE.md` for comprehensive documentation.

