const { requireAuth } = require('../../../lib/auth');
const { assertEnv } = require('../../../lib/env');
const { createCheckoutSession } = require('../../../lib/billing');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    assertEnv();
    const user = requireAuth(req);
    const session = await createCheckoutSession({ customerEmail: user.email });
    return res.status(200).json({ data: session });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Unable to create checkout session' });
  }
};
