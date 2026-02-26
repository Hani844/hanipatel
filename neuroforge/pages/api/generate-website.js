const { generateWebsite } = require('../../lib/aiEngine');
const { assertEnv } = require('../../lib/env');
const { validatePrompt } = require('../../lib/validators');
const { requireAuth } = require('../../lib/auth');
const { enforceFreeLimit, incrementUsage, getUsage, FREE_LIMIT } = require('../../lib/limits');
const { addHistory } = require('../../lib/historyStore');
const { createWebsiteZip } = require('../../utils/zipWebsite');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    assertEnv();
    const user = requireAuth(req);
    enforceFreeLimit(user.id);

    const prompt = validatePrompt(req.body?.prompt);
    const website = await generateWebsite(prompt);
    const websiteZip = await createWebsiteZip(website);
    const usage = incrementUsage(user.id);

    addHistory(user.id, { type: 'website', prompt, summary: website.layout?.hero?.title || 'Website generation' });

    return res.status(200).json({
      data: {
        website,
        websiteZip,
        previewUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/preview/website/${Date.now()}`,
        usage,
        freeLimit: FREE_LIMIT,
        remaining: Math.max(FREE_LIMIT - getUsage(user.id), 0)
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Failed to generate website' });
  }
};
