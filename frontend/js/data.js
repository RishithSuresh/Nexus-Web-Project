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
        id: 'evt001',
        title: 'Tech Innovation Summit 2024',
        description: 'Join us for an exciting day of technology talks, workshops, and networking. Industry leaders will share insights on AI, blockchain, and future tech trends. Perfect opportunity for students to connect with professionals.',
        date: '2024-11-15',
        time: '09:00 AM',
        location: 'Main Auditorium, Building A',
        category: 'Technology',
        organizer: 'org001',
        organizerName: 'Dr. Sarah Johnson',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Tech Summit', '6B9BD1') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#6B9BD1"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Tech Summit</text></svg>'),
        registrations: [],
        waitlist: [],
        maxCapacity: 200,
        tags: ['Technology', 'Innovation', 'Networking']
    },
    {
        id: 'evt002',
        title: 'Annual Cultural Fest',
        description: 'Experience the diversity of our campus! Three days of music, dance, drama, and art exhibitions. Participate in competitions, enjoy performances, and celebrate culture together.',
        date: '2024-11-20',
        time: '05:00 PM',
        location: 'Campus Grounds',
        category: 'Cultural',
        organizer: 'org002',
        organizerName: 'Prof. Michael Chen',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Cultural Fest', '9B7EBD') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#9B7EBD"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Cultural Fest</text></svg>'),
        registrations: [],
        waitlist: [],
        maxCapacity: 500,
        tags: ['Cultural', 'Arts', 'Music', 'Dance']
    },
    {
        id: 'evt003',
        title: 'Startup Pitch Competition',
        description: 'Have a brilliant startup idea? Pitch it to our panel of investors and entrepreneurs. Win funding, mentorship, and resources to bring your vision to life. Open to all students.',
        date: '2024-11-10',
        time: '02:00 PM',
        location: 'Innovation Hub, Building C',
        category: 'Business',
        organizer: 'org001',
        organizerName: 'Dr. Sarah Johnson',
        status: 'ongoing',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Startup Pitch', 'F4A6A3') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#F4A6A3"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Startup Pitch</text></svg>'),
        registrations: ['stu001'],
        waitlist: [],
        maxCapacity: 50,
        tags: ['Business', 'Entrepreneurship', 'Competition']
    },
    {
        id: 'evt004',
        title: 'Environmental Awareness Workshop',
        description: 'Learn about sustainable living, climate action, and how you can make a difference. Hands-on activities include tree planting, recycling workshops, and eco-friendly product making.',
        date: '2024-11-25',
        time: '10:00 AM',
        location: 'Botanical Garden',
        category: 'Environment',
        organizer: 'org002',
        organizerName: 'Prof. Michael Chen',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Environment', '81C784') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#81C784"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Environment</text></svg>'),
        registrations: [],
        waitlist: [],
        maxCapacity: 100,
        tags: ['Environment', 'Sustainability', 'Workshop']
    },
    {
        id: 'evt005',
        title: 'Sports Championship Finals',
        description: 'Cheer for your favorite teams in the inter-college sports championship! Basketball, football, volleyball, and more. Exciting matches, prizes, and lots of fun.',
        date: '2024-12-01',
        time: '08:00 AM',
        location: 'Sports Complex',
        category: 'Sports',
        organizer: 'org001',
        organizerName: 'Dr. Sarah Johnson',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Sports Finals', '64B5F6') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#64B5F6"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Sports Finals</text></svg>'),
        registrations: [],
        waitlist: [],
        maxCapacity: 1000,
        tags: ['Sports', 'Competition', 'Championship']
    },
    {
        id: 'evt006',
        title: 'Career Fair 2024',
        description: 'Meet recruiters from top companies! Bring your resumes, attend workshops on interview skills, and explore internship and job opportunities across various industries.',
        date: '2024-12-05',
        time: '11:00 AM',
        location: 'Convention Center',
        category: 'Career',
        organizer: 'org002',
        organizerName: 'Prof. Michael Chen',
        status: 'upcoming',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Career Fair', 'FFB74D') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#FFB74D"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Career Fair</text></svg>'),
        registrations: [],
        waitlist: [],
        maxCapacity: 300,
        tags: ['Career', 'Jobs', 'Networking']
    }
];

// Sample News Data
const SAMPLE_NEWS = [
    {
        id: 'news001',
        title: 'University Ranks in Top 50 Nationally',
        summary: 'Silicon Valley University has been ranked among the top 50 universities in the nation for innovation and research excellence.',
        content: 'In a prestigious national ranking released today, Silicon Valley University has secured a position in the top 50 universities for the third consecutive year. The ranking highlights our commitment to cutting-edge research, innovative teaching methods, and student success. President Dr. Amanda Foster stated, "This achievement reflects the hard work of our faculty, staff, and students."',
        date: '2024-10-25',
        author: 'Campus News Team',
        category: 'Achievement',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('University Ranking', '6B9BD1') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#6B9BD1"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">University Ranking</text></svg>'),
        tags: ['Achievement', 'Ranking', 'Excellence']
    },
    {
        id: 'news002',
        title: 'New AI Research Lab Inaugurated',
        summary: 'State-of-the-art Artificial Intelligence research facility opens with $10M funding from tech industry partners.',
        content: 'The university inaugurated its new AI Research Lab yesterday, equipped with cutting-edge technology and supported by major tech companies. The lab will focus on machine learning, natural language processing, and ethical AI development. Students will have access to advanced computing resources and mentorship from industry experts.',
        date: '2024-10-20',
        author: 'Tech Desk',
        category: 'Technology',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('AI Lab', '9B7EBD') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#9B7EBD"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">AI Lab</text></svg>'),
        tags: ['Technology', 'Research', 'AI']
    },
    {
        id: 'news003',
        title: 'Student Team Wins International Hackathon',
        summary: 'Our coding team secured first place at the Global Innovation Hackathon, competing against 200+ teams worldwide.',
        content: 'A team of four computer science students brought glory to the university by winning the Global Innovation Hackathon. Their project, an AI-powered accessibility tool for visually impaired users, impressed judges with its innovation and social impact. The team received $50,000 in prize money and mentorship opportunities.',
        date: '2024-10-18',
        author: 'Student Affairs',
        category: 'Achievement',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Hackathon Win', 'F4A6A3') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#F4A6A3"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Hackathon Win</text></svg>'),
        tags: ['Achievement', 'Technology', 'Competition']
    },
    {
        id: 'news004',
        title: 'Campus Sustainability Initiative Launched',
        summary: 'University commits to carbon neutrality by 2030 with comprehensive green campus program.',
        content: 'The administration announced an ambitious sustainability initiative aimed at achieving carbon neutrality by 2030. The program includes solar panel installation, waste reduction, green transportation, and sustainable dining options. Students are encouraged to participate in various eco-friendly activities and workshops.',
        date: '2024-10-15',
        author: 'Environmental Committee',
        category: 'Environment',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Sustainability', '81C784') : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#81C784"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Sustainability</text></svg>'),
        tags: ['Environment', 'Sustainability', 'Initiative']
    }
];

// Sample Clubs Data
const SAMPLE_CLUBS = [
    {
        id: 'club001',
        name: 'Coding Club',
        description: 'Learn programming, participate in hackathons, and build amazing projects together. Weekly coding sessions and workshops.',
        category: 'Technology',
        contact: {
            email: 'codingclub@campusconnect.edu',
            phone: '(555) 123-4501',
            president: 'Alex Rivera',
            advisor: 'Dr. Sarah Johnson'
        },
        members: 150,
        meetingTime: 'Fridays, 4:00 PM',
        location: 'Computer Lab, Building B',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Coding Club', '6B9BD1', 'FFFFFF', 300, 200) : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="#6B9BD1"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Coding Club</text></svg>'),
        organizedEvents: ['evt001', 'evt003'],  // Tech Summit, Startup Pitch
        memberIds: ['stu001']
    },
    {
        id: 'club002',
        name: 'Drama Society',
        description: 'Express yourself through theater! We perform plays, organize workshops, and celebrate the art of drama.',
        category: 'Arts',
        contact: {
            email: 'drama@campusconnect.edu',
            phone: '(555) 123-4502',
            president: 'Emma Thompson',
            advisor: 'Prof. Michael Chen'
        },
        members: 80,
        meetingTime: 'Tuesdays & Thursdays, 5:30 PM',
        location: 'Theater Hall',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('Drama Society', '9B7EBD', 'FFFFFF', 300, 200) : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="#9B7EBD"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">Drama Society</text></svg>'),
        organizedEvents: ['evt002'],  // Annual Cultural Fest
        memberIds: []
    },
    {
        id: 'club003',
        name: 'Entrepreneurship Cell',
        description: 'Turn your ideas into reality! Network with entrepreneurs, attend startup workshops, and launch your venture.',
        category: 'Business',
        contact: {
            email: 'ecell@campusconnect.edu',
            phone: '(555) 123-4503',
            president: 'Raj Patel',
            advisor: 'Dr. Sarah Johnson'
        },
        members: 120,
        meetingTime: 'Wednesdays, 6:00 PM',
        location: 'Innovation Hub',
        image: (typeof generatePlaceholderDataUrl === 'function') ? generatePlaceholderDataUrl('E-Cell', 'F4A6A3', 'FFFFFF', 300, 200) : 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="#F4A6A3"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#FFFFFF" dominant-baseline="middle" text-anchor="middle">E-Cell</text></svg>'),
        organizedEvents: ['evt003', 'evt004'],  // Startup Pitch, Environmental Workshop
        memberIds: []
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

