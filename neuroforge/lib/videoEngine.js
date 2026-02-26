async function generateVideo(prompt) {
  const providerKey = process.env.VIDEO_PROVIDER_API_KEY;

  if (!providerKey) {
    return {
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      storyboard: {
        title: 'Cinematic Launch Sequence',
        scenes: [
          { second: 0, visual: 'Neon skyline with floating UI shards', narration: `Opening based on: ${prompt}` },
          { second: 2, visual: '3D product reveal with volumetric light', narration: 'Core value proposition appears.' },
          { second: 4, visual: 'CTA pulse and brand lockup', narration: 'Call to action and close.' }
        ]
      }
    };
  }

  return {
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    storyboard: {
      title: 'Provider Integration Placeholder',
      scenes: [
        { second: 0, visual: `Provider key detected for prompt: ${prompt}`, narration: 'Replace with real API wiring.' }
      ]
    }
  };
}

module.exports = { generateVideo };
