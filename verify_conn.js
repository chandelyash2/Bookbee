
import pkg from "pg";
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';

// Manual env parsing since we are running a standalone script in the project root
const envFile = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...val] = line.split('=');
      return [key.trim(), val.join('=').trim().replace(/^['"]|['"]$/g, '')];
    })
);

const url = env.DATABASE_URL;
console.log("Connecting to:", url);

const pool = new Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function test() {
  try {
    console.log("Attempting to connect...");
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL!");
    const res = await client.query('SELECT NOW()');
    console.log("Current time from DB:", res.rows[0]);
    client.release();
    await pool.end();
  } catch (err) {
    console.error("FAILED to connect:", err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  }
}

test();
