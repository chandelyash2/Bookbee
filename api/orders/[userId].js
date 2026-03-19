import pool from '../../lib/db.js';

// GET /api/orders/[userId] — fetch order history for a user
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { userId } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT id, user_id, items, total_amount, stripe_payment_id, status, created_at
       FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    const orders = rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
      totalAmount: row.total_amount,
      stripePaymentId: row.stripe_payment_id,
      status: row.status,
      createdAt: row.created_at
    }));

    res.json({ status: 'ok', orders });
  } catch (error) {
    console.error('GET /orders error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
