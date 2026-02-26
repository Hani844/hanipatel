function validatePrompt(prompt) {
  if (typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('Prompt is required and must be a non-empty string.');
  }
  if (prompt.length > 2000) {
    throw new Error('Prompt exceeds maximum length of 2000 characters.');
  }
  return prompt.trim();
}

function validateMode(mode) {
  const allowed = ['website', 'video', 'launchkit'];
  if (!allowed.includes(mode)) {
    throw new Error(`Invalid mode. Allowed values: ${allowed.join(', ')}`);
  }
  return mode;
}

module.exports = {
  validatePrompt,
  validateMode
};
