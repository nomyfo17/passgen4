const WORD_LIST = ["quantum","cyber","matrix","vector","shield","kernel","syntax","cipher","binary","shadow","orbital","beacon","proton","vortex","static","system","phoenix","vertex","neuron","signal","pulse","header","packet","socket","buffer","deploy","docker","subnet","lambda","crypto","engine","module"];

function getSecureRandomInt(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function buildRandomKey(config) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789';
  const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charPool = '';
  if (config.uppercase) charPool += upper;
  if (config.lowercase) charPool += lower;
  if (config.numbers) charPool += nums;
  if (config.symbols) charPool += syms;

  if (config.avoidAmbiguous) {
    charPool = charPool.replace(/[0O1lI]/g, '');
  }

  if (!charPool) return { result: 'SELECT_OPTION', poolSize: 0 };

  let result = '';
  for (let i = 0; i < config.length; i++) {
    result += charPool[getSecureRandomInt(charPool.length)];
  }

  return { result, poolSize: charPool.length };
}

function buildPassphrase(count, separator) {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(WORD_LIST[getSecureRandomInt(WORD_LIST.length)]);
  }
  return { result: words.join(separator), poolSize: WORD_LIST.length };
}

function calculateEntropy(length, poolSize) {
  const effectivePool = poolSize > 0 ? poolSize : 70;
  return Math.round((length * Math.log2(effectivePool)) * 10) / 10;
}

function formatCrackTime(seconds) {
  if (seconds < 1) return 'INSTANT';
  if (seconds < 60) return `${Math.round(seconds)} SECONDS`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} MINUTES`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} HOURS`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} DAYS`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} YEARS`;
  return '100+ TRILLION YEARS';
}
