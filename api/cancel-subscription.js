import pool from '../lib/db.js';

export default async function handler(req, res) {
     if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

     const { email } = req.body;
     if (!email) return res.status(400).json({ status: 'error', message: 'email is required' });

     try {
          await pool.query("UPDATE subscribers SET status = 'cancelled' WHERE email = $1", [email]);
          res.json({ status: 'ok', message: 'Subscription cancelled' });
     } catch (error) {
          console.error('cancel-subscription error:', error.message);
          res.status(500).json({ status: 'error', message: error.message });
     }
}
