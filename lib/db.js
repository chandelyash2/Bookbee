import pkg from "pg";
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL is not set in environment variables!");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Ensures all required tables exist.
 */
export async function ensureAllTables() {
  const tables = [
    {
      name: "payments",
      sql: `
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
        amount INT NOT NULL,
        currency VARCHAR(10) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'requires_payment_method',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `,
    },
    {
      name: "orders",
      sql: `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        items JSON NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        stripe_payment_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `,
    },
    {
      name: "free",
      sql: `
      CREATE TABLE IF NOT EXISTS free (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        photo_url TEXT,
        credits_used INT DEFAULT 0,
        synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `,
    },
    {
      name: "subscribers",
      sql: `
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        quota_used INT DEFAULT 0,
        quota_limit INT DEFAULT 30,
        subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        stripe_payment_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active'
      )
      `,
    },
  ];

  const client = await pool.connect();

  try {
    for (const t of tables) {
      try {
        await client.query(t.sql);
      } catch (err) {
        console.error(`Failed to create table "${t.name}":`, err.message);
      }
    }
  } finally {
    client.release();
  }
}

// Automatically ensure tables exist on startup
ensureAllTables().catch(err => console.error("Auto-initialization failed:", err.message));

export default pool;
