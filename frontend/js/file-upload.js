/* ===================================
   FILE UPLOAD UTILITY
   Handles image uploads and storage
   =================================== */

/**
 * Convert file to base64 string
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {Object} {valid: boolean, error: string}
 */
function validateImageFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Only JPEG, PNG, GIF, and WebP images are allowed' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 5MB' };
    }

    return { valid: true, error: null };
}

/**
 * Handle image file upload
 * @param {Event} event - File input change event
 * @param {Function} callback - Callback function with base64 data
 */
async function handleImageUpload(event, callback) {
    const file = event.target.files[0];
    
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
        showToast(validation.error, 'error');
        return;
    }

    try {
        const base64 = await fileToBase64(file);
        
        // Show preview
        const previewId = event.target.dataset.previewId;
        if (previewId) {
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.style.backgroundImage = `url('${base64}')`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
            }
        }

        // Call callback with base64 data
        if (callback) {
            callback(base64);
        }

        showToast('Image uploaded successfully!', 'success');
    } catch (error) {
        console.error('Error uploading image:', error);
        showToast('Error uploading image', 'error');
    }
}

/**
 * Create image upload input HTML
 * @param {string} inputId - ID for the file input
 * @param {string} previewId - ID for the preview element
 * @param {string} currentImage - Current image URL or base64
 * @returns {string} HTML for image upload section
 */
function createImageUploadHTML(inputId, previewId, currentImage = null) {
    return `
        <div class="form-group">
            <label class="form-label">Event Image</label>
            <div class="image-upload-container">
                <div class="image-preview" id="${previewId}" style="${currentImage ? `background-image: url('${currentImage}')` : 'background-color: #f0f0f0'};"></div>
                <div class="upload-controls">
                    <input type="file" id="${inputId}" class="file-input" accept="image/*" data-preview-id="${previewId}">
                    <label for="${inputId}" class="upload-label">
                        <span class="upload-icon">📸</span>
                        <span class="upload-text">Click to upload image</span>
                        <span class="upload-hint">Max 5MB • JPEG, PNG, GIF, WebP</span>
                    </label>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup image upload handlers for a form
 * @param {string} inputId - ID of file input
 * @param {Function} callback - Callback function
 */
function setupImageUploadHandler(inputId, callback) {
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
        fileInput.addEventListener('change', (e) => handleImageUpload(e, callback));
    }
}

/**
 * Get image data from upload input
 * @param {string} inputId - ID of file input
 * @returns {string|null} Base64 image data or null
 */
function getUploadedImageData(inputId) {
    const fileInput = document.getElementById(inputId);
    if (!fileInput || !fileInput.files[0]) {
        return null;
    }
    
    // Return the preview's background image if available
    const previewId = fileInput.dataset.previewId;
    if (previewId) {
        const preview = document.getElementById(previewId);
        if (preview && preview.style.backgroundImage) {
            const match = preview.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
            if (match) {
                return match[1];
            }
        }
    }
    
    return null;
}

/**
 * Store image in localStorage with event ID
 * @param {string} eventId - Event ID
 * @param {string} imageData - Base64 image data
 */
function storeEventImage(eventId, imageData) {
    if (!imageData) return;
    
    const images = JSON.parse(localStorage.getItem('event_images') || '{}');
    images[eventId] = imageData;
    localStorage.setItem('event_images', JSON.stringify(images));
}

/**
 * Retrieve image from localStorage
 * @param {string} eventId - Event ID
 * @returns {string|null} Base64 image data or null
 */
function getEventImage(eventId) {
    const images = JSON.parse(localStorage.getItem('event_images') || '{}');
    return images[eventId] || null;
}

/**
 * Delete image from localStorage
 * @param {string} eventId - Event ID
 */
function deleteEventImage(eventId) {
    const images = JSON.parse(localStorage.getItem('event_images') || '{}');
    delete images[eventId];
    localStorage.setItem('event_images', JSON.stringify(images));
}

/**
 * Get image URL for event (uploaded or default)
 * @param {string} eventId - Event ID
 * @param {string} defaultImage - Default image URL
 * @returns {string} Image URL
 */
function getEventImageUrl(eventId, defaultImage = null) {
    const uploadedImage = getEventImage(eventId);
    if (uploadedImage) {
        return uploadedImage;
    }
    return defaultImage || 'https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Event';
}

/* News image helpers (separate storage key) */
function storeNewsImage(newsId, imageData) {
    if (!imageData) return;
    const images = JSON.parse(localStorage.getItem('news_images') || '{}');
    images[newsId] = imageData;
    localStorage.setItem('news_images', JSON.stringify(images));
}

function getNewsImage(newsId) {
    const images = JSON.parse(localStorage.getItem('news_images') || '{}');
    return images[newsId] || null;
}

function deleteNewsImage(newsId) {
    const images = JSON.parse(localStorage.getItem('news_images') || '{}');
    delete images[newsId];
    localStorage.setItem('news_images', JSON.stringify(images));
}

function getNewsImageUrl(newsId, defaultImage = null) {
    const uploaded = getNewsImage(newsId);
    if (uploaded) return uploaded;
    return defaultImage || 'https://via.placeholder.com/400x250/9B7EBD/FFFFFF?text=News';
}

