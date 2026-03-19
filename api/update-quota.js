import pool from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  const { email, quotaUsed } = req.body;
  if (!email || quotaUsed === undefined) {
    return res.status(400).json({ status: 'error', message: 'email and quotaUsed are required' });
  }

  try {
    await pool.query('UPDATE subscribers SET quota_used = $1 WHERE email = $2', [quotaUsed, email]);
    res.json({ status: 'ok' });
  } catch (error) {
    console.error('update-quota error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
