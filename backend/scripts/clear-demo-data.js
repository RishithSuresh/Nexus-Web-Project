const pool = require('../config/database');

async function clearDemoData() {
  try {
    console.log('🔧 Clearing demo data...');
    // Disable FK checks while truncating
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');

    const tables = [
      'event_tags',
      'event_registrations',
      'club_members',
      'notifications',
      'events',
      'news',
      'clubs'
    ];

    for (const t of tables) {
      console.log(`- Truncating ${t}...`);
      await pool.query(`TRUNCATE TABLE \`${t}\``);
    }

    // Re-enable FK checks
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ Demo data cleared successfully.');
  } catch (err) {
    console.error('❌ Failed to clear demo data:', err.message);
  } finally {
    try { await pool.end(); } catch (e) { /* ignore */ }
    process.exit(0);
  }
}

clearDemoData();
