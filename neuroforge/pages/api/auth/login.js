const { signToken } = require('../../../lib/auth');
const { assertEnv } = require('../../../lib/env');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    assertEnv();
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = {
      id: Buffer.from(email).toString('base64').slice(0, 24),
      email
    };

    const token = signToken(user);
    return res.status(200).json({ data: { token, user } });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
