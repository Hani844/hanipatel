const historyMap = global.__neuroforgeHistoryMap || new Map();
global.__neuroforgeHistoryMap = historyMap;

function addHistory(userId, item) {
  const current = historyMap.get(userId) || [];
  const updated = [
    {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...item
    },
    ...current
  ].slice(0, 50);
  historyMap.set(userId, updated);
  return updated[0];
}

function getHistory(userId) {
  return historyMap.get(userId) || [];
}

module.exports = {
  addHistory,
  getHistory
};
