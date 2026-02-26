const { requireAuth } = require('../../lib/auth');
const { assertEnv } = require('../../lib/env');
const { getHistory } = require('../../lib/historyStore');
const { getUsage, FREE_LIMIT } = require('../../lib/limits');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    assertEnv();
    const user = requireAuth(req);
    const history = getHistory(user.id);
    const usage = getUsage(user.id);

    return res.status(200).json({
      data: {
        history,
        usage,
        freeLimit: FREE_LIMIT,
        remaining: Math.max(FREE_LIMIT - usage, 0)
      }
    });
  } catch (error) {
    return res.status(401).json({ error: error.message || 'Unauthorized' });
  }
};
