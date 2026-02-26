const Stripe = require('stripe');

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
  });
}

async function createCheckoutSession({ customerEmail }) {
  const stripe = getStripeClient();
  if (!stripe) {
    return {
      checkoutUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/billing-placeholder`,
      placeholder: true
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: customerEmail,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?upgraded=false`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 1900,
          product_data: { name: 'NeuroForge Pro Upgrade' }
        }
      }
    ]
  });

  return { checkoutUrl: session.url, placeholder: false };
}

module.exports = { createCheckoutSession };
