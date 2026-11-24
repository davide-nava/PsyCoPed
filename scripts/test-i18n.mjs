// Verifies that every UI dictionary exposes exactly the same keys as the Italian source of truth
// (and that list-type values keep the same length). Run with: npm run test:i18n
// Requires a Node version that can load .ts files with erasable types (Node >= 22.18 / 24).
import { it } from '../src/i18n/it.ts';
import { en } from '../src/i18n/en.ts';

const dictionaries = { en };

/** Flatten nested objects/arrays into `a.b.0.c -> shape` entries. */
function flatten(value, prefix = '', out = new Map()) {
  if (Array.isArray(value)) {
    out.set(prefix, `array(${value.length})`);
    value.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out.set(prefix, typeof value);
  }
  return out;
}

const reference = flatten(it);
let failures = 0;

for (const [locale, dict] of Object.entries(dictionaries)) {
  const current = flatten(dict);
  for (const [key, shape] of reference) {
    if (!current.has(key)) {
      console.error(`[${locale}] missing key: ${key}`);
      failures++;
    } else if (current.get(key) !== shape) {
      console.error(`[${locale}] shape mismatch at ${key}: expected ${shape}, got ${current.get(key)}`);
      failures++;
    } else if (shape === 'string' && String(readPath(dict, key)).trim() === '') {
      console.error(`[${locale}] empty translation: ${key}`);
      failures++;
    }
  }
  for (const key of current.keys()) {
    if (!reference.has(key)) {
      console.error(`[${locale}] extra key not in it: ${key}`);
      failures++;
    }
  }
}

function readPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

if (failures) {
  console.error(`\ni18n check failed: ${failures} problem(s).`);
  process.exit(1);
}
console.log(`i18n check passed: ${reference.size} entries, locales: it, ${Object.keys(dictionaries).join(', ')}.`);
