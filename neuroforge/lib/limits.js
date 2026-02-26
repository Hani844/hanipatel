const FREE_LIMIT = 3;

const usageMap = global.__neuroforgeUsageMap || new Map();
global.__neuroforgeUsageMap = usageMap;

function getUsage(userId) {
  return usageMap.get(userId) || 0;
}

function incrementUsage(userId) {
  const current = getUsage(userId);
  usageMap.set(userId, current + 1);
  return current + 1;
}

function enforceFreeLimit(userId) {
  const current = getUsage(userId);
  if (current >= FREE_LIMIT) {
    throw new Error('Free generation limit reached. Upgrade via Stripe to continue.');
  }
}

module.exports = {
  FREE_LIMIT,
  getUsage,
  incrementUsage,
  enforceFreeLimit
};
