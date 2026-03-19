import pool, { ensureAllTables } from '../lib/db.js';

let tablesReady = false;

export default async function handler(req, res) {
  if (!tablesReady) {
    try {
      await ensureAllTables();
      tablesReady = true;
    } catch (err) {
      console.error('Table creation failed:', err.message);
    }
  }

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is missing");
    }
    await pool.query('SELECT 1');
    res.json({ 
      status: 'ok', 
      message: 'Database connection successful', 
      db: process.env.DB_NAME,
      url_provided: !!process.env.DATABASE_URL
    });
  } catch (error) {
    console.error('Health check failed:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
