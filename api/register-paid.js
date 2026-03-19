import bcrypt from 'bcryptjs';
import pool from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password, stripePaymentId } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO subscribers (email, password_hash, quota_used, quota_limit, stripe_payment_id, status)
       VALUES ($1, $2, 0, 30, $3, 'active')
       ON CONFLICT (email) DO UPDATE SET
         password_hash     = EXCLUDED.password_hash,
         quota_used        = 0,
         quota_limit       = 30,
         stripe_payment_id  = EXCLUDED.stripe_payment_id,
         status           = 'active',
         subscription_date = CURRENT_TIMESTAMP`,
      [email.toLowerCase().trim(), passwordHash, stripePaymentId || null]
    );
    res.json({ status: 'ok', message: 'Subscriber registered' });
  } catch (error) {
    console.error('register-paid error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
