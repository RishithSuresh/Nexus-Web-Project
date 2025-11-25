/* ===================================
   DATA MANAGEMENT SYSTEM
   LocalStorage-based Database
   
   INSTRUCTIONS FOR ADDING/EDITING DATA:
   1. To add events: Add to SAMPLE_EVENTS array
   2. To add news: Add to SAMPLE_NEWS array
   3. To add clubs: Add to SAMPLE_CLUBS array
   4. To add users: Add to SAMPLE_USERS array
   5. Data auto-initializes on first load
   =================================== */

// Sample Events Data
const SAMPLE_EVENTS = [
    {
        id: 'evt100',
        title: 'Tech Innovation Summit 2025',
        description: 'Talks and workshops about AI, ML and cloud. Industry speakers and student showcases.',
        date: '2025-11-30',
        time: '09:00 AM',
        location: 'Main Auditorium',
        category: 'Technology',
        organizer: 'org001',
        organizerName: 'Dr. Sarah Johnson',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Tech Innovation Summit', '64B5F6', 'FFFFFF', 720, 400) : '',
        registrations: [],
        waitlist: [],
        maxCapacity: 300,
        tags: ['Tech','Innovation']
    },
    {
        id: 'evt101',
        title: 'Annual Cultural Fest',
        description: 'Three days of music, dance, drama and art across campus.',
        date: '2025-12-05',
        time: '05:00 PM',
        location: 'Campus Grounds',
        category: 'Cultural',
        organizer: 'org002',
        organizerName: 'Prof. Michael Chen',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Cultural Fest', '9B7EBD', 'FFFFFF', 720, 400) : '',
        registrations: [],
        waitlist: [],
        maxCapacity: 1000,
        tags: ['Culture','Festival']
    },
    {
        id: 'evt102',
        title: 'Startup Pitch Night',
        description: 'Students pitch ideas to mentors and investors. Prizes and mentorship opportunities.',
        date: '2025-12-10',
        time: '06:00 PM',
        location: 'Innovation Hub',
        category: 'Business',
        organizer: 'admin001',
        organizerName: 'Campus Admin',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Startup Pitch', 'F4A6A3', 'FFFFFF', 720, 400) : '',
        registrations: [],
        waitlist: [],
        maxCapacity: 200,
        tags: ['Startup','Pitch']
    },
    {
        id: 'evt103',
        title: 'Environmental Workshop',
        description: 'Hands-on sessions about sustainability and green practices.',
        date: '2025-12-15',
        time: '10:00 AM',
        location: 'Botanical Garden',
        category: 'Environment',
        organizer: 'org002',
        organizerName: 'Prof. Michael Chen',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Environment Workshop', '81C784', 'FFFFFF', 720, 400) : '',
        registrations: [],
        waitlist: [],
        maxCapacity: 150,
        tags: ['Environment','Workshop']
    },
    {
        id: 'evt104',
        title: 'Career Fair 2025',
        description: 'Meet recruiters, attend CV clinics and interview workshops.',
        date: '2025-12-20',
        time: '11:00 AM',
        location: 'Convention Center',
        category: 'Career',
        organizer: 'org001',
        organizerName: 'Dr. Sarah Johnson',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Career Fair', 'FFB74D', '000000', 720, 400) : '',
        registrations: [],
        waitlist: [],
        maxCapacity: 500,
        tags: ['Career','Jobs']
    }
];

// Sample News Data
const SAMPLE_NEWS = [
    {
        id: 'news100',
        title: 'University Ranked Top 50',
        summary: 'University recognized for innovation and research excellence.',
        content: 'The university has been ranked among the top 50 nationally for research and innovation.',
        date: '2025-11-20',
        author: 'Dr. Sarah Johnson',
        category: 'Achievement',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Top 50 Ranking', '6B9BD1', 'FFFFFF', 640, 360) : '',
        tags: ['Ranking','Achievement']
    },
    {
        id: 'news101',
        title: 'New AI Lab Launch',
        summary: 'AI Research Lab inaugurated with industry partners.',
        content: 'The new AI lab will provide resources and mentorship for students and researchers.',
        date: '2025-11-18',
        author: 'Prof. Michael Chen',
        category: 'Technology',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('AI Lab', '9B7EBD', 'FFFFFF', 640, 360) : '',
        tags: ['AI','Research']
    }
];

// Sample Clubs Data
const SAMPLE_CLUBS = [
    {
        id: 'club001',
        name: 'Coding Club',
        description: 'Learn programming, participate in hackathons, and build projects.',
        category: 'Technology',
        contact: { email: 'coding@campusconnect.edu', phone: '(555) 100-0001', president: 'Dr. Sarah Johnson' },
        members: 120,
        meetingTime: 'Fridays, 4:00 PM',
        location: 'Computer Lab',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Coding Club', '6B9BD1', 'FFFFFF', 300, 200) : '',
        organizedEvents: ['evt100', 'evt102'],
        memberIds: ['stu001']
    },
    {
        id: 'club002',
        name: 'Drama Society',
        description: 'Theater productions, workshops and performances.',
        category: 'Arts',
        contact: { email: 'drama@campusconnect.edu', phone: '(555) 100-0002', president: 'Prof. Michael Chen' },
        members: 80,
        meetingTime: 'Tuesdays, 5:30 PM',
        location: 'Theater Hall',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Drama Society', '9B7EBD', 'FFFFFF', 300, 200) : '',
        organizedEvents: ['evt101'],
        memberIds: []
    },
    {
        id: 'club003',
        name: 'Entrepreneurship Cell',
        description: 'Support for student startups, networking and mentorship.',
        category: 'Business',
        contact: { email: 'ecell@campusconnect.edu', phone: '(555) 100-0003', president: 'Campus Admin' },
        members: 95,
        meetingTime: 'Wednesdays, 6:00 PM',
        location: 'Innovation Hub',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('E-Cell', 'F4A6A3', 'FFFFFF', 300, 200) : '',
        organizedEvents: ['evt102'],
        memberIds: ['stu002']
    }
];

// Sample Users Data
const SAMPLE_USERS = [
    {
        id: 'stu001',
        username: 'student',
        password: 'student123',
        role: 'student',
        profile: {
            name: 'John Doe',
            email: 'john.doe@student.edu',
            phone: '(555) 111-2222',
            department: 'Computer Science',
            year: '3rd Year',
            bio: 'Passionate about technology and innovation',
            profilePic: ''
        },
        registeredEvents: ['evt003'],
        createdAt: '2024-01-15'
    },
    {
        id: 'org001',
        username: 'organizer',
        password: 'organizer123',
        role: 'organizer',
        profile: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@campusconnect.edu',
            phone: '(555) 333-4444',
            department: 'Computer Science',
            position: 'Professor & Event Coordinator',
            bio: 'Dedicated to creating engaging campus experiences',
            profilePic: ''
        },
        createdEvents: ['evt001', 'evt003', 'evt005'],
        createdAt: '2024-01-10'
    },
    {
        id: 'org002',
        username: 'organizer2',
        password: 'organizer123',
        role: 'organizer',
        profile: {
            name: 'Prof. Michael Chen',
            email: 'michael.chen@campusconnect.edu',
            phone: '(555) 555-6666',
            department: 'Arts & Culture',
            position: 'Associate Professor',
            bio: 'Promoting cultural diversity and student engagement',
            profilePic: ''
        },
        createdEvents: ['evt002', 'evt004', 'evt006'],
        createdAt: '2024-01-10'
    }
];

// Database Class - Manages all localStorage operations
class Database {
    constructor() {
        this.init();
    }

    // Initialize database with sample data if empty
    init() {
        if (!localStorage.getItem('campusconnect_initialized')) {
            this.setEvents(SAMPLE_EVENTS);
            this.setNews(SAMPLE_NEWS);
            this.setClubs(SAMPLE_CLUBS);
            this.setUsers(SAMPLE_USERS);
            localStorage.setItem('campusconnect_initialized', 'true');
            console.log('✅ Database initialized with sample data');
        }
    }

    // Generic get/set methods
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Events Methods
    getEvents() {
        return this.get('events') || [];
    }

    setEvents(events) {
        this.set('events', events);
    }

    getEventById(id) {
        const events = this.getEvents();
        return events.find(event => event.id === id);
    }

    addEvent(event) {
        const events = this.getEvents();
        events.push(event);
        this.setEvents(events);
    }

    updateEvent(id, updatedEvent) {
        const events = this.getEvents();
        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events[index] = { ...events[index], ...updatedEvent };
            this.setEvents(events);
            return true;
        }
        return false;
    }

    deleteEvent(id) {
        const events = this.getEvents();
        const filtered = events.filter(event => event.id !== id);
        this.setEvents(filtered);
    }

    // News Methods
    getNews() {
        return this.get('news') || [];
    }

    setNews(news) {
        this.set('news', news);
    }

    getNewsById(id) {
        const news = this.getNews();
        return news.find(item => item.id === id);
    }
    
    addNews(newsItem) {
        const news = this.getNews();
        news.push(newsItem);
        this.setNews(news);
    }

    updateNews(id, updatedNews) {
        const news = this.getNews();
        const index = news.findIndex(n => n.id === id);
        if (index !== -1) {
            news[index] = { ...news[index], ...updatedNews };
            this.setNews(news);
            return true;
        }
        return false;
    }

    deleteNews(id) {
        const news = this.getNews();
        const filtered = news.filter(n => n.id !== id);
        this.setNews(filtered);
    }

    // Clubs Methods
    getClubs() {
        return this.get('clubs') || [];
    }

    setClubs(clubs) {
        this.set('clubs', clubs);
    }

    getClubById(id) {
        const clubs = this.getClubs();
        return clubs.find(club => club.id === id);
    }

    // Club member management
    getClubMembers(clubId) {
        const club = this.getClubById(clubId);
        if (!club || !club.memberIds) return [];
        return club.memberIds.map(id => this.getUserById(id)).filter(u => u !== undefined && u !== null);
    }

    addMemberToClub(clubId, userId) {
        const clubs = this.getClubs();
        const index = clubs.findIndex(c => c.id === clubId);
        if (index === -1) return false;
        const club = clubs[index];
        if (!club.memberIds) club.memberIds = [];
        if (!club.memberIds.includes(userId)) club.memberIds.push(userId);
        // update member count if exists
        if (typeof club.members === 'number') club.members = Math.max(club.members, club.memberIds.length);
        clubs[index] = club;
        this.setClubs(clubs);
        return true;
    }

    removeMemberFromClub(clubId, userId) {
        const clubs = this.getClubs();
        const index = clubs.findIndex(c => c.id === clubId);
        if (index === -1) return false;
        const club = clubs[index];
        if (!club.memberIds) club.memberIds = [];
        club.memberIds = club.memberIds.filter(id => id !== userId);
        // update member count
        if (typeof club.members === 'number') club.members = club.memberIds.length;
        clubs[index] = club;
        this.setClubs(clubs);
        return true;
    }

    // Users Methods
    getUsers() {
        return this.get('users') || [];
    }

    setUsers(users) {
        this.set('users', users);
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    getUserByUsername(username) {
        const users = this.getUsers();
        return users.find(user => user.username === username);
    }

    updateUser(id, updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            this.setUsers(users);
            return true;
        }
        return false;
    }

    // Registration Methods

    // Register for event, add to waitlist if full
    registerForEvent(userId, eventId) {
        const event = this.getEventById(eventId);
        const user = this.getUserById(userId);
        if (!event || !user) return false;
        // Already registered
        if (event.registrations.includes(userId)) return 'already-registered';
        // Already waitlisted
        if (event.waitlist && event.waitlist.includes(userId)) return 'already-waitlisted';
        // Register if space
        if (event.registrations.length < event.maxCapacity) {
            event.registrations.push(userId);
            this.updateEvent(eventId, event);
            if (!user.registeredEvents) user.registeredEvents = [];
            user.registeredEvents.push(eventId);
            this.updateUser(userId, user);
            return 'registered';
        } else {
            // Add to waitlist
            if (!event.waitlist) event.waitlist = [];
            event.waitlist.push(userId);
            this.updateEvent(eventId, event);
            return 'waitlisted';
        }
    }

    // Remove user from event registration or waitlist
    unregisterFromEvent(userId, eventId) {
        const event = this.getEventById(eventId);
        const user = this.getUserById(userId);
        if (!event || !user) return false;
        let changed = false;
        // Remove from registrations
        if (event.registrations.includes(userId)) {
            event.registrations = event.registrations.filter(id => id !== userId);
            changed = true;
            // Remove from user
            if (user.registeredEvents) {
                user.registeredEvents = user.registeredEvents.filter(id => id !== eventId);
                this.updateUser(userId, user);
            }
            // Promote from waitlist if any
            if (event.waitlist && event.waitlist.length > 0) {
                const nextUserId = event.waitlist.shift();
                event.registrations.push(nextUserId);
                // Update promoted user's registeredEvents
                const nextUser = this.getUserById(nextUserId);
                if (nextUser) {
                    if (!nextUser.registeredEvents) nextUser.registeredEvents = [];
                    nextUser.registeredEvents.push(eventId);
                    this.updateUser(nextUserId, nextUser);
                }
            }
        }
        // Remove from waitlist
        if (event.waitlist && event.waitlist.includes(userId)) {
            event.waitlist = event.waitlist.filter(id => id !== userId);
            changed = true;
        }
        if (changed) {
            this.updateEvent(eventId, event);
            return true;
        }
        return false;
    }

    // Get waitlist for an event
    getEventWaitlist(eventId) {
        const event = this.getEventById(eventId);
        if (!event || !event.waitlist) return [];
        return event.waitlist.map(id => this.getUserById(id)).filter(u => u);
    }

    // Check if user is waitlisted for event
    isUserWaitlisted(userId, eventId) {
        const event = this.getEventById(eventId);
        return event && event.waitlist && event.waitlist.includes(userId);
    }

    // Promote next user from waitlist (manual trigger)
    promoteNextWaitlisted(eventId) {
        const event = this.getEventById(eventId);
        if (!event || !event.waitlist || event.waitlist.length === 0) return false;
        if (event.registrations.length >= event.maxCapacity) return false;
        const nextUserId = event.waitlist.shift();
        event.registrations.push(nextUserId);
        this.updateEvent(eventId, event);
        // Update promoted user's registeredEvents
        const nextUser = this.getUserById(nextUserId);
        if (nextUser) {
            if (!nextUser.registeredEvents) nextUser.registeredEvents = [];
            nextUser.registeredEvents.push(eventId);
            this.updateUser(nextUserId, nextUser);
        }
        return true;
    }

    unregisterFromEvent(userId, eventId) {
        const event = this.getEventById(eventId);
        const user = this.getUserById(userId);
        
        if (!event || !user) return false;
        
        // Remove from event
        event.registrations = event.registrations.filter(id => id !== userId);
        this.updateEvent(eventId, event);
        
        // Remove from user
        user.registeredEvents = user.registeredEvents.filter(id => id !== eventId);
        this.updateUser(userId, user);
        
        return true;
    }

    // Analytics Methods
    getEventAnalytics(eventId) {
        const event = this.getEventById(eventId);
        if (!event) return null;

        const registrationRate = (event.registrations.length / event.maxCapacity) * 100;
        const spotsLeft = event.maxCapacity - event.registrations.length;

        return {
            eventId: event.id,
            title: event.title,
            totalRegistrations: event.registrations.length,
            maxCapacity: event.maxCapacity,
            spotsLeft: spotsLeft,
            registrationRate: Math.round(registrationRate),
            isFull: spotsLeft <= 0,
            status: event.status,
            date: event.date,
            category: event.category
        };
    }

    // Get all events analytics for organizer
    getOrganizerAnalytics(organizerId) {
        const events = this.getEvents();
        const organizerEvents = events.filter(e => e.organizer === organizerId);

        const totalEvents = organizerEvents.length;
        const totalRegistrations = organizerEvents.reduce((sum, e) => sum + e.registrations.length, 0);
        const totalCapacity = organizerEvents.reduce((sum, e) => sum + e.maxCapacity, 0);
        const avgRegistrationRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

        const eventsByStatus = {
            upcoming: organizerEvents.filter(e => e.status === 'upcoming').length,
            ongoing: organizerEvents.filter(e => e.status === 'ongoing').length,
            completed: organizerEvents.filter(e => e.status === 'completed').length
        };

        const eventsByCategory = {};
        organizerEvents.forEach(e => {
            eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1;
        });

        return {
            totalEvents,
            totalRegistrations,
            totalCapacity,
            avgRegistrationRate,
            eventsByStatus,
            eventsByCategory,
            events: organizerEvents.map(e => this.getEventAnalytics(e.id))
        };
    }

    // Get student engagement metrics
    getStudentMetrics(studentId) {
        const user = this.getUserById(studentId);
        if (!user || user.role !== 'student') return null;

        const registeredEvents = (user.registeredEvents || [])
            .map(id => this.getEventById(id))
            .filter(e => e !== undefined);

        const eventsByCategory = {};
        registeredEvents.forEach(e => {
            eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1;
        });

        return {
            totalRegistrations: registeredEvents.length,
            eventsByCategory,
            upcomingEvents: registeredEvents.filter(e => e.status === 'upcoming').length,
            ongoingEvents: registeredEvents.filter(e => e.status === 'ongoing').length,
            completedEvents: registeredEvents.filter(e => e.status === 'completed').length,
            registeredEvents: registeredEvents
        };
    }

    // Get platform-wide statistics
    getPlatformStats() {
        const events = this.getEvents();
        const users = this.getUsers();
        const clubs = this.getClubs();

        const totalRegistrations = events.reduce((sum, e) => sum + e.registrations.length, 0);
        const totalCapacity = events.reduce((sum, e) => sum + e.maxCapacity, 0);

        const students = users.filter(u => u.role === 'student').length;
        const organizers = users.filter(u => u.role === 'organizer').length;

        return {
            totalEvents: events.length,
            totalClubs: clubs.length,
            totalUsers: users.length,
            totalStudents: students,
            totalOrganizers: organizers,
            totalRegistrations,
            totalCapacity,
            averageRegistrationRate: totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0,
            eventsByStatus: {
                upcoming: events.filter(e => e.status === 'upcoming').length,
                ongoing: events.filter(e => e.status === 'ongoing').length,
                completed: events.filter(e => e.status === 'completed').length
            },
            eventsByCategory: this._groupBy(events, 'category')
        };
    }

    // Helper method to group by property
    _groupBy(array, property) {
        return array.reduce((acc, obj) => {
            acc[obj[property]] = (acc[obj[property]] || 0) + 1;
            return acc;
        }, {});
    }

    // Favorites/Wishlist Methods
    addToFavorites(userId, eventId) {
        const user = this.getUserById(userId);
        if (!user) return false;

        if (!user.favoriteEvents) user.favoriteEvents = [];
        if (!user.favoriteEvents.includes(eventId)) {
            user.favoriteEvents.push(eventId);
            this.updateUser(userId, user);
            return true;
        }
        return false;
    }

    removeFromFavorites(userId, eventId) {
        const user = this.getUserById(userId);
        if (!user) return false;

        if (user.favoriteEvents) {
            user.favoriteEvents = user.favoriteEvents.filter(id => id !== eventId);
            this.updateUser(userId, user);
            return true;
        }
        return false;
    }

    isFavorite(userId, eventId) {
        const user = this.getUserById(userId);
        if (!user || !user.favoriteEvents) return false;
        return user.favoriteEvents.includes(eventId);
    }

    getFavoriteEvents(userId) {
        const user = this.getUserById(userId);
        if (!user || !user.favoriteEvents) return [];

        return user.favoriteEvents
            .map(id => this.getEventById(id))
            .filter(e => e !== undefined);
    }

    // Event Ratings & Reviews
    addEventReview(userId, eventId, rating, review) {
        const event = this.getEventById(eventId);
        if (!event) return false;

        if (!event.reviews) event.reviews = [];

        // Check if user already reviewed
        const existingReview = event.reviews.find(r => r.userId === userId);
        if (existingReview) {
            existingReview.rating = rating;
            existingReview.review = review;
            existingReview.date = new Date().toISOString();
        } else {
            event.reviews.push({
                userId,
                rating,
                review,
                date: new Date().toISOString()
            });
        }

        this.updateEvent(eventId, event);
        return true;
    }

    getEventReviews(eventId) {
        const event = this.getEventById(eventId);
        if (!event || !event.reviews) return [];

        return event.reviews.map(review => {
            const user = this.getUserById(review.userId);
            return {
                ...review,
                userName: user ? user.profile.name : 'Anonymous'
            };
        });
    }

    getEventAverageRating(eventId) {
        const reviews = this.getEventReviews(eventId);
        if (reviews.length === 0) return 0;

        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }
}

// Initialize global database instance
const db = new Database();

