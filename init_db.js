
import pkg from "pg";
const { Pool } = pkg;
import fs from 'fs';

// Manual env parsing
const envFile = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...val] = line.split('=');
      return [key.trim(), val.join('=').trim().replace(/^['"]|['"]$/g, '')];
    })
);

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function ensureAllTables() {
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
      console.log(`Creating table ${t.name}...`);
      await client.query(t.sql);
    }
    console.log("All tables verified/created.");
  } finally {
    client.release();
  }
}

async function run() {
  try {
    await ensureAllTables();
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Existing tables:", tables.rows.map(r => r.table_name));
    await pool.end();
  } catch (err) {
    console.error("Setup failed:", err.message);
    process.exit(1);
  }
}

run();
