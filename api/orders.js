import pool from '../lib/db.js';

export default async function handler(req, res) {
  // POST /api/orders — create order
  if (req.method === 'POST') {
    const { userId, items, totalAmount, stripePaymentId } = req.body;
    if (!userId || !items || totalAmount === undefined) {
      return res.status(400).json({ status: 'error', message: 'userId, items, and totalAmount are required' });
    }
    try {
      const { rows } = await pool.query(
        `INSERT INTO orders (user_id, items, total_amount, stripe_payment_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [userId, JSON.stringify(items), totalAmount, stripePaymentId || null, stripePaymentId ? 'paid' : 'pending']
      );
      return res.status(201).json({ status: 'ok', message: 'Order created', orderId: rows[0].id });
    } catch (error) {
      console.error('POST /orders error:', error.message);
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
