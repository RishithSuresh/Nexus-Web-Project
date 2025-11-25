#!/usr/bin/env node

/**
 * Database Setup Script
 * Run this script to initialize the MySQL database with the schema
 * Usage: node scripts/setup-database.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const setupDatabase = async () => {
    console.log('🔧 Starting database setup...\n');

    // Create connection to MySQL server (without selecting database)
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected to MySQL server\n');

        // Read schema file
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('📝 Executing database schema...\n');

        // Split schema into individual statements and execute
        const statements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        for (const statement of statements) {
            try {
                await connection.query(statement);
                const firstLine = statement.split('\n')[0].substring(0, 50);
                console.log(`✓ ${firstLine}...`);
            } catch (error) {
                console.error(`❌ Error executing: ${statement.substring(0, 50)}...`);
                console.error(`   Error: ${error.message}\n`);
            }
        }

        console.log('\n✅ Database setup completed successfully!');
        console.log(`📦 Database "${process.env.DB_NAME || 'campus_connect'}" is ready to use`);

    } catch (error) {
        console.error('❌ Database setup failed:');
        console.error(`   Error: ${error.message}`);
        console.error('\n⚠️  Make sure:');
        console.error('   1. MySQL is running');
        console.error('   2. Your credentials in .env are correct');
        console.error('   3. You have permissions to create databases');
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n✓ Connection closed');
        }
    }
};

// Run setup
setupDatabase().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
