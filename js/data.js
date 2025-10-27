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
        image: 'https://via.placeholder.com/400x250/6B9BD1/FFFFFF?text=Tech+Summit',
        registrations: [],
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
        image: 'https://via.placeholder.com/400x250/9B7EBD/FFFFFF?text=Cultural+Fest',
        registrations: [],
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
        image: 'https://via.placeholder.com/400x250/F4A6A3/FFFFFF?text=Startup+Pitch',
        registrations: ['stu001'],
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
        image: 'https://via.placeholder.com/400x250/81C784/FFFFFF?text=Environment',
        registrations: [],
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
        image: 'https://via.placeholder.com/400x250/64B5F6/FFFFFF?text=Sports+Finals',
        registrations: [],
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
        image: 'https://via.placeholder.com/400x250/FFB74D/FFFFFF?text=Career+Fair',
        registrations: [],
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
        image: 'https://via.placeholder.com/400x250/6B9BD1/FFFFFF?text=University+Ranking',
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
        image: 'https://via.placeholder.com/400x250/9B7EBD/FFFFFF?text=AI+Lab',
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
        image: 'https://via.placeholder.com/400x250/F4A6A3/FFFFFF?text=Hackathon+Win',
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
        image: 'https://via.placeholder.com/400x250/81C784/FFFFFF?text=Sustainability',
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
        image: 'https://via.placeholder.com/300x200/6B9BD1/FFFFFF?text=Coding+Club'
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
        image: 'https://via.placeholder.com/300x200/9B7EBD/FFFFFF?text=Drama+Society'
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
        image: 'https://via.placeholder.com/300x200/F4A6A3/FFFFFF?text=E-Cell'
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
    registerForEvent(userId, eventId) {
        const event = this.getEventById(eventId);
        const user = this.getUserById(userId);
        
        if (!event || !user) return false;
        
        // Check if already registered
        if (event.registrations.includes(userId)) return false;
        
        // Check capacity
        if (event.registrations.length >= event.maxCapacity) return false;
        
        // Add registration
        event.registrations.push(userId);
        this.updateEvent(eventId, event);
        
        // Update user's registered events
        if (!user.registeredEvents) user.registeredEvents = [];
        user.registeredEvents.push(eventId);
        this.updateUser(userId, user);
        
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
}

// Initialize global database instance
const db = new Database();

