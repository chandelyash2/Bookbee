import pool from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { userId, email, displayName, photoURL } = req.body;
  if (!userId || !email) {
    return res.status(400).json({ status: 'error', message: 'userId and email are required' });
  }

  try {
    const { rows } = await pool.query('SELECT id FROM free WHERE email = $1 LIMIT 1', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ status: 'already_registered', message: 'This email is already registered.' });
    }
    await pool.query(
      'INSERT INTO free (user_id, email, display_name, photo_url) VALUES ($1, $2, $3, $4)',
      [userId, email, displayName || null, photoURL || null]
    );
    res.json({ status: 'ok', message: 'Free user registered', userId, email });
  } catch (error) {
    console.error('sync-free error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
