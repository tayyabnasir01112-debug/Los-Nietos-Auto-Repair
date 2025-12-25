/**
 * Database Migration Script
 * This script runs the initial database schema migration
 * 
 * Usage: node scripts/run-migration.js
 * 
 * Make sure DATABASE_URL environment variable is set
 */

import pg from 'pg';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.error('Please set it: export DATABASE_URL="your-connection-string"');
  process.exit(1);
}

async function runMigration() {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false // Required for Supabase
    }
  });

  try {
    console.log('🔌 Connecting to database...');
    
    // Read SQL migration file
    const sqlPath = join(__dirname, '..', 'migrations', '001_initial_schema.sql');
    const sql = await readFile(sqlPath, 'utf-8');
    
    console.log('📝 Running migration...');
    await pool.query(sql);
    
    console.log('✅ Migration completed successfully!');
    console.log('📊 Tables created: inquiries, services, testimonials');
    
    // Verify tables were created
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('inquiries', 'services', 'testimonials')
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Created tables:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();

