const axios = require('axios');

const defaultWebsiteJSON = {
  branding: {
    primaryColor: '#6d28d9',
    secondaryColor: '#06b6d4',
    font: 'Inter'
  },
  layout: {
    hero: {
      title: 'NeuroForge Generated Experience',
      subtitle: 'Immersive digital presence crafted by AI.'
    },
    sections: [
      { heading: 'Features', content: 'Real-time 3D visuals and cinematic interactions.' },
      { heading: 'Technology', content: 'Three.js, motion systems, and AI generated assets.' }
    ]
  },
  threejsScene: {
    objects: [
      { type: 'box', color: '#6d28d9', position: [0, 0, 0], size: [1.3, 1.3, 1.3], rotationSpeed: 0.01 },
      { type: 'sphere', color: '#06b6d4', position: [2.2, 0.5, -1], radius: 0.7, rotationSpeed: 0.006 }
    ],
    animations: [
      { target: 0, type: 'rotateY', speed: 0.01 },
      { target: 1, type: 'floatY', speed: 0.015 }
    ]
  }
};

async function generateWebsite(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const systemPrompt = 'You are an elite 3D web architect. Return ONLY structured JSON.';
  const userPrompt = `Generate a 3D website based on: ${prompt}\n\nExpected JSON format:\n{\n  "branding": {\n    "primaryColor": "",\n    "secondaryColor": "",\n    "font": ""\n  },\n  "layout": {\n    "hero": {},\n    "sections": []\n  },\n  "threejsScene": {\n    "objects": [],\n    "animations": []\n  }\n}\n\nNO TEXT OUTSIDE JSON.`;

  if (!apiKey) {
    return defaultWebsiteJSON;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) throw new Error('AI returned empty content');
    const parsed = JSON.parse(content);
    if (!parsed?.branding || !parsed?.layout || !parsed?.threejsScene) {
      throw new Error('AI JSON is missing required fields');
    }
    return parsed;
  } catch (error) {
    return {
      ...defaultWebsiteJSON,
      layout: {
        ...defaultWebsiteJSON.layout,
        hero: {
          title: 'Fallback AI Design',
          subtitle: `Generation fallback used: ${error.message}`
        }
      }
    };
  }
}

module.exports = { generateWebsite };
