# Event Image Upload Feature - Complete Guide

## 🎯 Overview

The Campus Connect application now has a fully functional **event image upload system** that allows organizers to:
- ✅ Upload images directly from their computer
- ✅ Preview images before saving
- ✅ Store images persistently in localStorage
- ✅ Edit event images anytime
- ✅ Use uploaded images or URL-based images

## 🚀 Features

### 1. **Image Upload for Event Creation**
When creating a new event, organizers can:
- Click the upload area to select an image file
- See a live preview of the selected image
- Alternatively, paste an image URL
- Uploaded images take priority over URLs

### 2. **Image Upload for Event Editing**
When editing an existing event, organizers can:
- See the current event image
- Upload a new image to replace it
- Keep the existing image if no new upload
- Update the image URL if preferred

### 3. **Image Storage**
- Images are converted to **base64 format**
- Stored in **localStorage** with event ID as key
- Persistent across browser sessions
- Maximum file size: **5MB**
- Supported formats: **JPEG, PNG, GIF, WebP**

### 4. **Image Display**
- Uploaded images display in event cards
- Images show in event details modal
- Fallback to placeholder if no image

## 📁 Files Created/Modified

### New Files Created:
1. **js/file-upload.js** - Image upload utility module
2. **css/image-upload.css** - Image upload styling

### Files Modified:
1. **js/dashboard.js** - Added image upload to create/edit forms
2. **index.html** - Added CSS and JS references
3. **pages/dashboard.html** - Added CSS and JS references
4. **pages/events.html** - Added CSS and JS references
5. **pages/login.html** - Added JS reference
6. **pages/news.html** - Added JS reference
7. **pages/clubs.html** - Added JS reference

## 🔧 How It Works

### File Upload Process

```javascript
// 1. User selects file
<input type="file" id="eventImageUpload" accept="image/*">

// 2. File is validated
validateImageFile(file)
// Checks: file type, file size (max 5MB)

// 3. File converted to base64
fileToBase64(file)
// Returns: data:image/jpeg;base64,...

// 4. Preview displayed
preview.style.backgroundImage = `url('${base64}')`

// 5. Image stored with event
storeEventImage(eventId, base64Data)
// Stored in: localStorage['event_images'][eventId]
```

### Image Retrieval

```javascript
// Get image for specific event
getEventImage(eventId)
// Returns: base64 data or null

// Get image URL (uploaded or default)
getEventImageUrl(eventId, defaultImage)
// Returns: base64 data, default image, or placeholder
```

## 💻 Usage Examples

### Creating Event with Image Upload

```javascript
// 1. User fills form and selects image
// 2. Image preview shows in upload area
// 3. User clicks "Create Event"
// 4. Image is stored with event ID
// 5. Event created successfully
```

### Editing Event Image

```javascript
// 1. Organizer clicks "Edit Event"
// 2. Current image displays in preview
// 3. Can upload new image or keep existing
// 4. Click "Save Changes"
// 5. Image updated in storage
```

## 🎨 UI Components

### Image Upload HTML
```html
<div class="image-upload-container">
    <div class="image-preview" id="eventImagePreview"></div>
    <div class="upload-controls">
        <input type="file" id="eventImageUpload" class="file-input" accept="image/*">
        <label for="eventImageUpload" class="upload-label">
            <span class="upload-icon">📸</span>
            <span class="upload-text">Click to upload image</span>
            <span class="upload-hint">Max 5MB • JPEG, PNG, GIF, WebP</span>
        </label>
    </div>
</div>
```

### CSS Classes
- `.image-upload-container` - Main container
- `.image-preview` - Image preview area
- `.upload-controls` - Upload controls wrapper
- `.upload-label` - Clickable upload area
- `.upload-icon` - Icon styling
- `.upload-text` - Main text
- `.upload-hint` - Helper text

## 📊 API Reference

### File Upload Functions

#### `fileToBase64(file)`
Converts file to base64 string
```javascript
const base64 = await fileToBase64(file);
```

#### `validateImageFile(file)`
Validates image file
```javascript
const validation = validateImageFile(file);
if (validation.valid) {
    // File is valid
} else {
    console.log(validation.error);
}
```

#### `handleImageUpload(event, callback)`
Handles file input change event
```javascript
fileInput.addEventListener('change', (e) => {
    handleImageUpload(e, (base64) => {
        console.log('Image uploaded:', base64);
    });
});
```

#### `createImageUploadHTML(inputId, previewId, currentImage)`
Creates image upload HTML
```javascript
const html = createImageUploadHTML('fileInput', 'preview', currentImageUrl);
```

#### `setupImageUploadHandler(inputId, callback)`
Setup upload handler
```javascript
setupImageUploadHandler('eventImageUpload', (base64) => {
    uploadedImage = base64;
});
```

#### `getUploadedImageData(inputId)`
Get uploaded image data
```javascript
const imageData = getUploadedImageData('eventImageUpload');
```

#### `storeEventImage(eventId, imageData)`
Store image in localStorage
```javascript
storeEventImage('evt001', base64Data);
```

#### `getEventImage(eventId)`
Retrieve image from localStorage
```javascript
const image = getEventImage('evt001');
```

#### `getEventImageUrl(eventId, defaultImage)`
Get image URL (uploaded or default)
```javascript
const url = getEventImageUrl('evt001', 'https://...');
```

## ✅ Validation Rules

### File Type
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)
- ❌ Other formats rejected

### File Size
- ✅ Maximum: 5MB
- ❌ Larger files rejected

### Error Handling
- Invalid file type → Error message
- File too large → Error message
- Upload failure → Error message
- Success → Success message

## 🔒 Data Storage

### localStorage Structure
```javascript
{
    "event_images": {
        "evt001": "data:image/jpeg;base64,...",
        "evt002": "data:image/png;base64,...",
        "evt003": "data:image/gif;base64,..."
    }
}
```

### Storage Limits
- localStorage limit: ~5-10MB per domain
- Each base64 image: ~1-2MB (depending on size)
- Recommended: Keep images under 1MB

## 🎯 Best Practices

1. **Image Size**: Keep images under 1MB for optimal performance
2. **Format**: Use JPEG for photos, PNG for graphics
3. **Dimensions**: Recommended 400x250px or similar aspect ratio
4. **Backup**: Consider backing up important images
5. **Cleanup**: Delete old event images to free storage

## 🐛 Troubleshooting

### Image Not Displaying
- Check browser console for errors
- Verify localStorage is enabled
- Check file size (max 5MB)
- Try different image format

### Upload Fails
- Verify file type is supported
- Check file size is under 5MB
- Clear browser cache
- Try different browser

### Storage Full
- Delete old event images
- Clear localStorage
- Use smaller image files

## 🚀 Future Enhancements

Potential improvements:
- Image cropping tool
- Multiple images per event
- Image compression
- Cloud storage integration
- Image gallery view

## 📝 Summary

The event image upload feature provides a complete solution for managing event images:
- ✅ Easy file upload
- ✅ Live preview
- ✅ Persistent storage
- ✅ Flexible editing
- ✅ Robust validation
- ✅ User-friendly interface

Organizers can now create and edit events with professional-looking images! 🎉

