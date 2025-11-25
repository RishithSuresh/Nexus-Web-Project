const pool = require('../config/database');
const bcrypt = require('bcryptjs');

function makeSvg(title, w = 600, h = 360, bg = '#6B9BD1', fg = '#FFFFFF') {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>\n  <rect width='100%' height='100%' fill='${bg}'/>\n  <text x='50%' y='50%' font-family='Arial, Helvetica, sans-serif' font-size='32' fill='${fg}' dominant-baseline='middle' text-anchor='middle'>${title}</text>\n</svg>`;
  return Buffer.from(svg);
}

async function seed() {
  console.log('🔧 Seeding demo data...');
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Clean up any existing demo rows for the same IDs to make seeding idempotent
    console.log('- Removing conflicting demo rows if present...');
    const userIds = ['stu001','stu002','org001','org002','admin001'];
    const clubIds = ['club001','club002','club003'];
    const eventIds = ['evt100','evt101','evt102'];
    const newsIds = ['news100','news101'];

    // Remove dependent rows first
    if (eventIds.length) {
      await conn.query('DELETE FROM event_tags WHERE event_id IN (?)', [eventIds]);
      await conn.query('DELETE FROM event_registrations WHERE event_id IN (?)', [eventIds]);
      await conn.query('DELETE FROM notifications WHERE related_event_id IN (?)', [eventIds]);
      await conn.query('DELETE FROM events WHERE id IN (?)', [eventIds]);
    }
    if (newsIds.length) {
      await conn.query('DELETE FROM news WHERE id IN (?)', [newsIds]);
    }
    if (clubIds.length) {
      await conn.query('DELETE FROM club_members WHERE club_id IN (?)', [clubIds]);
      await conn.query('DELETE FROM clubs WHERE id IN (?)', [clubIds]);
    }
    if (userIds.length) {
      // Remove registrations/members/notifications referencing these users
      await conn.query('DELETE FROM event_registrations WHERE student_id IN (?)', [userIds]);
      await conn.query('DELETE FROM club_members WHERE member_id IN (?)', [userIds]);
      await conn.query('DELETE FROM notifications WHERE recipient_id IN (?)', [userIds]);
      await conn.query('DELETE FROM users WHERE id IN (?)', [userIds]);
    }

    // Insert users (students + organizers + admin)
    const users = [
      { id: 'stu001', username: 'student1', password: 'student123', role: 'student', name: 'Alice Student', email: 'alice@student.edu' },
      { id: 'stu002', username: 'student2', password: 'student123', role: 'student', name: 'Bob Student', email: 'bob@student.edu' },
      { id: 'org001', username: 'organizer1', password: 'organizer123', role: 'organizer', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@campusconnect.edu' },
      { id: 'org002', username: 'organizer2', password: 'organizer123', role: 'organizer', name: 'Prof. Michael Chen', email: 'michael.chen@campusconnect.edu' },
      { id: 'admin001', username: 'admin', password: 'admin123', role: 'organizer', name: 'Campus Admin', email: 'admin@campusconnect.edu' }
    ];

    for (const u of users) {
      console.log(`- Seeding user ${u.id} (${u.username})`);
      const hashed = bcrypt.hashSync(u.password, 8);
      const profilePic = makeSvg(u.name, 200, 200, '#8AB4D5');
      await conn.query(
        'INSERT INTO users (id, username, password, role, name, email, phone, department, year_or_position, bio, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [u.id, u.username, hashed, u.role, u.name, u.email, '', '', '', `Demo user ${u.name}`, profilePic]
      );
    }

    // Insert clubs
    const clubs = [
      { id: 'club001', name: 'Coding Club', description: 'Weekly coding sessions, hackathons', category: 'Technology', president_id: 'org001', president_name: 'Dr. Sarah Johnson', email: 'coding@campusconnect.edu', phone: '(555) 100-0001', meeting_time: 'Fridays 4pm', location: 'Comp Lab' },
      { id: 'club002', name: 'Drama Society', description: 'Plays and workshops', category: 'Arts', president_id: 'org002', president_name: 'Prof. Michael Chen', email: 'drama@campusconnect.edu', phone: '(555) 100-0002', meeting_time: 'Tuesdays 5:30pm', location: 'Theater Hall' },
      { id: 'club003', name: 'Entrepreneurship Cell', description: 'Startup support and pitching', category: 'Business', president_id: 'admin001', president_name: 'Campus Admin', email: 'ecell@campusconnect.edu', phone: '(555) 100-0003', meeting_time: 'Wednesdays 6pm', location: 'Innovation Hub' }
    ];

    for (const c of clubs) {
      console.log(`- Seeding club ${c.id} (${c.name})`);
      const img = makeSvg(c.name, 400, 240, '#9B7EBD');
      await conn.query(
        'INSERT INTO clubs (id, name, description, category, president_id, president_name, email, phone, members, meeting_time, location, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [c.id, c.name, c.description, c.category, c.president_id, c.president_name, c.email, c.phone, 0, c.meeting_time, c.location, img]
      );
    }

    // Insert events
    const events = [
      { id: 'evt100', title: 'Tech Innovation Summit 2025', description: 'Talks and workshops about AI, ML and cloud.', date: '2025-11-30', time: '09:00:00', location: 'Main Auditorium', category: 'Technology', organizer_id: 'org001', organizer_name: 'Dr. Sarah Johnson', status: 'upcoming', max_capacity: 300 },
      { id: 'evt101', title: 'Annual Cultural Fest', description: 'Music, dance and art across 3 days.', date: '2025-12-05', time: '17:00:00', location: 'Campus Grounds', category: 'Cultural', organizer_id: 'org002', organizer_name: 'Prof. Michael Chen', status: 'upcoming', max_capacity: 1000 },
      { id: 'evt102', title: 'Startup Pitch Night', description: 'Pitch to investors and mentors.', date: '2025-12-10', time: '18:00:00', location: 'Innovation Hub', category: 'Business', organizer_id: 'admin001', organizer_name: 'Campus Admin', status: 'upcoming', max_capacity: 200 }
    ];

    for (const e of events) {
      console.log(`- Seeding event ${e.id} (${e.title})`);
      const img = makeSvg(e.title, 720, 400, '#64B5F6');
      await conn.query(
        'INSERT INTO events (id, title, description, date, time, location, category, organizer_id, organizer_name, status, image, max_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [e.id, e.title, e.description, e.date, e.time, e.location, e.category, e.organizer_id, e.organizer_name, e.status, img, e.max_capacity]
      );

      // add tags
      const tags = e.title.split(' ').slice(0, 3).map(t => t.replace(/[^a-zA-Z0-9]/g, ''));
      for (const tag of tags) {
        console.log(`  - Adding tag: ${tag}`);
        await conn.query('INSERT INTO event_tags (event_id, tag) VALUES (?, ?)', [e.id, tag]);
      }
    }

    // Insert news
    const news = [
      { id: 'news100', title: 'University Ranked Top 50', content: 'University recognized for innovation and research.', date: '2025-11-20', author_id: 'org001', author_name: 'Dr. Sarah Johnson', category: 'Achievement' },
      { id: 'news101', title: 'New AI Lab Launch', content: 'AI Research Lab inaugurated with industry partnerships.', date: '2025-11-18', author_id: 'org002', author_name: 'Prof. Michael Chen', category: 'Technology' }
    ];

    for (const n of news) {
      console.log(`- Seeding news ${n.id} (${n.title})`);
      const img = makeSvg(n.title, 640, 360, '#F4A6A3');
      await conn.query('INSERT INTO news (id, title, content, author_id, author_name, category, image, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [n.id, n.title, n.content, n.author_id, n.author_name, n.category, img, n.date]);
    }

    // Some registrations (students attending events)
    await conn.query('INSERT INTO event_registrations (event_id, student_id) VALUES (?, ?)', ['evt100', 'stu001']);
    await conn.query('INSERT INTO event_registrations (event_id, student_id) VALUES (?, ?)', ['evt101', 'stu002']);

    // Club members
    await conn.query('INSERT INTO club_members (club_id, member_id) VALUES (?, ?)', ['club001', 'stu001']);
    await conn.query('INSERT INTO club_members (club_id, member_id) VALUES (?, ?)', ['club003', 'stu002']);

    // Notifications
    await conn.query('INSERT INTO notifications (recipient_id, title, message, type, related_event_id, is_read) VALUES (?, ?, ?, ?, ?, ?)',
      ['stu001', 'Event Reminder', 'Don\'t forget Tech Innovation Summit tomorrow at 9 AM.', 'reminder', 'evt100', false]);

    await conn.commit();
    // Print counts for verification
    const [[evCount]] = await conn.query('SELECT COUNT(*) as c FROM events');
    const [[nwCount]] = await conn.query('SELECT COUNT(*) as c FROM news');
    const [[clCount]] = await conn.query('SELECT COUNT(*) as c FROM clubs');
    const [[usCount]] = await conn.query('SELECT COUNT(*) as c FROM users');
    console.log('✅ Demo data seeded successfully. Summary:');
    console.log(`  users: ${usCount.c}, events: ${evCount.c}, news: ${nwCount.c}, clubs: ${clCount.c}`);
  } catch (err) {
    console.error('❌ Failed to seed demo data:', err.message);
    try { await conn.rollback(); } catch (e) { /* ignore */ }
  } finally {
    try { conn.release(); } catch (e) {}
    try { await pool.end(); } catch (e) {}
    process.exit(0);
  }
}

seed();
