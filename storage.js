const STORAGE_KEY = 'passgen_logs_flat';

function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveHistoryItem(item) {
  const history = getHistory();
  history.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}

function removeHistoryItem(id) {
  const history = getHistory().filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function purgeHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

function exportHistoryJSON() {
  const data = localStorage.getItem(STORAGE_KEY) || '[]';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `passgen_export_${Date.now()}.json`;
  a.click();
}
