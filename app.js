let currentMode = 'standard';

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  render();
  registerSW();
});

function setupEventListeners() {
  document.getElementById('btn-generate').addEventListener('click', render);
  document.getElementById('btn-gen-batch').addEventListener('click', handleBatchGeneration);
  
  document.getElementById('length-slider').addEventListener('input', (e) => {
    document.getElementById('slider-val').innerText = e.target.value;
    document.getElementById('output-badge').innerText = `${e.target.value} CHARS`;
    render();
  });

  // Checkboxes
  ['opt-uppercase', 'opt-lowercase', 'opt-numbers', 'opt-symbols', 'opt-ambiguous'].forEach(id => {
    document.getElementById(id).addEventListener('change', render);
  });

  // Tabs
  document.getElementById('tab-standard').addEventListener('click', () => switchTab('standard'));
  document.getElementById('tab-passphrase').addEventListener('click', () => switchTab('passphrase'));
  document.getElementById('tab-batch').addEventListener('click', () => switchTab('batch'));

  // Copy & Save
  document.getElementById('btn-copy-main').addEventListener('click', () => {
    const val = document.getElementById('password-output').value;
    copyString(val);
  });

  document.getElementById('btn-save-log').addEventListener('click', () => {
    const pwd = document.getElementById('password-output').value;
    const tag = document.getElementById('site-tag').value.trim() || 'UNTAGGED';
    const entropy = document.getElementById('metric-entropy').innerText;

    if (!pwd || pwd.startsWith('SELECT_')) return;

    saveHistoryItem({
      id: Date.now(),
      tag,
      pwd,
      entropy,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    document.getElementById('site-tag').value = '';
    renderHistoryUI();
    showToast('SAVED_TO_HISTORY');
  });

  document.getElementById('btn-purge-history').addEventListener('click', () => {
    if (confirm('Purge all saved local entries?')) {
      purgeHistory();
      renderHistoryUI();
    }
  });

  document.getElementById('btn-export').addEventListener('click', exportHistoryJSON);
}

function switchTab(mode) {
  currentMode = mode;
  ['standard', 'passphrase', 'batch'].forEach(m => {
    const tabBtn = document.getElementById(`tab-${m}`);
    const panel = document.getElementById(`panel-${m}`);
    
    if (m === mode) {
      tabBtn.className = 'tab-btn px-4 py-2 border-b-2 border-white text-white font-bold text-xs tracking-wider';
      panel.classList.remove('hidden');
    } else {
      tabBtn.className = 'tab-btn px-4 py-2 border-b-2 border-transparent text-zinc-500 hover:text-white font-bold text-xs tracking-wider';
      panel.classList.add('hidden');
    }
  });
  render();
}

function render() {
  let pwd = '';
  let poolSize = 0;

  if (currentMode === 'standard') {
    const config = {
      length: parseInt(document.getElementById('length-slider').value),
      uppercase: document.getElementById('opt-uppercase').checked,
      lowercase: document.getElementById('opt-lowercase').checked,
      numbers: document.getElementById('opt-numbers').checked,
      symbols: document.getElementById('opt-symbols').checked,
      avoidAmbiguous: document.getElementById('opt-ambiguous').checked
    };
    const res = buildRandomKey(config);
    pwd = res.result;
    poolSize = res.poolSize;
  } else if (currentMode === 'passphrase') {
    const count = parseInt(document.getElementById('passphrase-words').value) || 4;
    const sep = document.getElementById('passphrase-sep').value;
    const res = buildPassphrase(count, sep);
    pwd = res.result;
    poolSize = res.poolSize;
  }

  document.getElementById('password-output').value = pwd;

  // Analytics
  const entropy = calculateEntropy(pwd.length, poolSize);
  document.getElementById('metric-entropy').innerText = entropy;
  document.getElementById('metric-pool').innerText = poolSize;

  const seconds = Math.pow(2, entropy) / 100000000000;
  document.getElementById('metric-crack-time').innerText = formatCrackTime(seconds);

  renderHistoryUI();
}

function handleBatchGeneration() {
  const count = parseInt(document.getElementById('batch-count').value) || 8;
  const length = parseInt(document.getElementById('length-slider').value);
  const items = [];
  
  for (let i = 0; i < count; i++) {
    const config = {
      length,
      uppercase: document.getElementById('opt-uppercase').checked,
      lowercase: document.getElementById('opt-lowercase').checked,
      numbers: document.getElementById('opt-numbers').checked,
      symbols: document.getElementById('opt-symbols').checked,
      avoidAmbiguous: document.getElementById('opt-ambiguous').checked
    };
    items.push(buildRandomKey(config).result);
  }
  document.getElementById('batch-output').value = items.join('\n');
}

function renderHistoryUI() {
  const history = getHistory();
  const container = document.getElementById('history-container');

  if (history.length === 0) {
    container.innerHTML = `<div class="text-xs text-zinc-600 italic py-4 text-center">No saved history.</div>`;
    return;
  }

  container.innerHTML = history.map(item => `
    <div class="bg-black border border-zinc-800 p-3 flex justify-between items-center text-xs">
      <div class="truncate mr-2">
        <div class="flex items-center space-x-2">
          <span class="text-white font-bold">${escapeHtml(item.tag)}</span>
          <span class="text-[10px] text-zinc-500">${item.date}</span>
        </div>
        <div class="text-zinc-400 font-mono truncate text-[11px] mt-0.5">${escapeHtml(item.pwd)}</div>
      </div>
      <div class="flex items-center space-x-2 shrink-0">
        <button onclick="copyString('${escapeJs(item.pwd)}')" class="bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 text-[10px]">COPY</button>
        <button onclick="deleteEntry(${item.id})" class="text-zinc-600 hover:text-red-400 px-1">✕</button>
      </div>
    </div>
  `).join('');
}

function deleteEntry(id) {
  removeHistoryItem(id);
  renderHistoryUI();
}

function copyString(str) {
  navigator.clipboard.writeText(str);
  showToast('COPIED_TO_CLIPBOARD');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none'), 1800);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJs(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
