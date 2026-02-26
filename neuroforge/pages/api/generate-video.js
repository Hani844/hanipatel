const { generateVideo } = require('../../lib/videoEngine');
const { assertEnv } = require('../../lib/env');
const { validatePrompt } = require('../../lib/validators');
const { requireAuth } = require('../../lib/auth');
const { enforceFreeLimit, incrementUsage, getUsage, FREE_LIMIT } = require('../../lib/limits');
const { addHistory } = require('../../lib/historyStore');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    assertEnv();
    const user = requireAuth(req);
    enforceFreeLimit(user.id);

    const prompt = validatePrompt(req.body?.prompt);
    const video = await generateVideo(prompt);
    const usage = incrementUsage(user.id);

    addHistory(user.id, { type: 'video', prompt, summary: video.storyboard?.title || 'Video generation' });

    return res.status(200).json({
      data: {
        video,
        usage,
        freeLimit: FREE_LIMIT,
        remaining: Math.max(FREE_LIMIT - getUsage(user.id), 0)
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Failed to generate video' });
  }
};
