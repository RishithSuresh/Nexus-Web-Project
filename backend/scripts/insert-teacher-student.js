const pool = require('../config/database');
const bcrypt = require('bcryptjs');

async function insertTeacher() {
  console.log('🔧 Inserting teacher as student...');
  const conn = await pool.getConnection();
  try {
    const id = 'teacher001';
    const username = 'teacher';
    const plainPassword = 'teacher123';
    const role = 'student';
    const name = 'Dr. Laura Smith';
    const email = 'laura.smith@campusconnect.edu';

    // Check if user exists by id or username
    const [[existing]] = await conn.query('SELECT COUNT(*) as c FROM users WHERE id = ? OR username = ?', [id, username]);
    if (existing.c > 0) {
      console.log(`ℹ️ User with id '${id}' or username '${username}' already exists. Skipping insert.`);
      return;
    }

    const hashed = bcrypt.hashSync(plainPassword, 8);

    await conn.query(
      'INSERT INTO users (id, username, password, role, name, email, phone, department, year_or_position, bio, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, username, hashed, role, name, email, '', 'Mathematics', 'Lecturer', 'Teaching and curriculum development', null]
    );

    console.log(`✅ Inserted teacher '${username}' as student (id=${id}).`);
  } catch (err) {
    console.error('❌ Failed to insert teacher:', err.message);
  } finally {
    try { conn.release(); } catch (e) {}
    try { await pool.end(); } catch (e) {}
    process.exit(0);
  }
}

insertTeacher();
