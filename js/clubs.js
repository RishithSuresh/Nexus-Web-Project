/* ===================================
   CLUBS PAGE SCRIPT
   Handles club display and filtering
   =================================== */

let allClubs = [];
let filteredClubs = [];

document.addEventListener('DOMContentLoaded', () => {
    loadClubs();
    setupEventListeners();
});

// Load all clubs
function loadClubs() {
    allClubs = db.getClubs();
    filteredClubs = [...allClubs];
    displayClubs();
}

// Display clubs in grid
function displayClubs() {
    const clubsGrid = document.getElementById('clubsGrid');
    if (!clubsGrid) return;
    
    if (filteredClubs.length === 0) {
        showEmptyState(clubsGrid, 'No clubs found matching your criteria', '🎯');
        return;
    }
    
    clubsGrid.innerHTML = filteredClubs.map(club => createClubCard(club)).join('');
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
    
    filteredClubs = allClubs.filter(club => {
        const matchesSearch = !searchTerm || 
            club.name.toLowerCase().includes(searchTerm) ||
            club.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || club.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayClubs();
}

