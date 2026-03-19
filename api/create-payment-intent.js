import Stripe from 'stripe';
import pool from '../lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { amount, currency, customerEmail } = req.body;
  if (!amount || !currency || !customerEmail) {
    return res.status(400).json({ status: 'error', message: 'amount, currency, and customerEmail are required' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      receipt_email: customerEmail,
      metadata: { customerEmail },
      automatic_payment_methods: { enabled: true },
    });

    await pool.query(
      `INSERT INTO payments (payment_intent_id, amount, currency, customer_email, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (payment_intent_id) DO UPDATE SET status = EXCLUDED.status`,
      [paymentIntent.id, paymentIntent.amount, paymentIntent.currency, customerEmail, paymentIntent.status]
    );

    res.json({ status: 'ok', clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error('PaymentIntent error:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
