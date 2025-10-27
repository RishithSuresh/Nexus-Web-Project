/* ===================================
   NEWS PAGE SCRIPT
   Handles news display and filtering
   =================================== */

let allNews = [];
let filteredNews = [];

document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    setupEventListeners();
    checkForNewsParam();
});

// Load all news
function loadNews() {
    allNews = db.getNews();
    filteredNews = [...allNews];
    displayNews();
}

// Display news in grid
function displayNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    if (filteredNews.length === 0) {
        showEmptyState(newsGrid, 'No news found matching your criteria', '📰');
        return;
    }
    
    // Sort by date (newest first)
    const sortedNews = filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    newsGrid.innerHTML = sortedNews.map(news => createNewsCard(news)).join('');
    
    // Add click handlers to open news details
    newsGrid.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', () => {
            const newsId = card.dataset.newsId;
            showNewsDetails(newsId);
        });
    });
}

// Setup event listeners for search and filters
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

// Apply all filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    
    filteredNews = allNews.filter(news => {
        const matchesSearch = !searchTerm || 
            news.title.toLowerCase().includes(searchTerm) ||
            news.summary.toLowerCase().includes(searchTerm) ||
            news.content.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || news.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayNews();
}

// Show news details in modal
function showNewsDetails(newsId) {
    const news = db.getNewsById(newsId);
    if (!news) return;
    
    const content = `
        <div class="news-detail">
            <img src="${news.image}" alt="${news.title}" class="news-detail-image">
            <div class="news-detail-content">
                <div class="news-detail-header">
                    <span class="news-category">${news.category}</span>
                </div>
                <h2>${news.title}</h2>
                <div class="news-meta">
                    <span class="news-date">📅 ${formatDate(news.date)}</span>
                    <span class="news-author">✍️ ${news.author}</span>
                </div>
                <p class="news-detail-summary"><strong>${news.summary}</strong></p>
                <p class="news-detail-text">${news.content}</p>
                
                ${news.tags && news.tags.length > 0 ? `
                    <div class="news-tags">
                        ${news.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    showModal(news.title, content, []);
    
    const modalFooter = document.querySelector('.modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '<button class="btn btn-outline" onclick="closeModal()">Close</button>';
    }
}

// Check if news ID is in URL parameters
function checkForNewsParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('news');
    
    if (newsId) {
        setTimeout(() => {
            showNewsDetails(newsId);
        }, 100);
    }
}

