#!/usr/bin/env node
/**
 * CI backstop for the DatePicker / MaskedInput ban:
 * 1) Fail if src/ disables no-restricted-imports for this ban.
 * 2) Fail if eslint --print-config no longer lists the ban paths.
 */
const { execFileSync } = require('child_process');
const { readFileSync, readdirSync, statSync } = require('fs');
const { join } = require('path');

const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === '__generated__' || name === 'node_modules') continue;
      walk(p, out);
    } else if (/\.(js|jsx|ts|tsx)$/.test(name)) {
      out.push(p);
    }
  }
  return out;
}

const disableRe =
  /eslint-disable(?:-next-line|-line)?[^\n]*no-restricted-imports/;

let disableHits = 0;
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8');
  if (disableRe.test(text)) {
    console.error(`Banned eslint-disable of no-restricted-imports: ${file}`);
    disableHits += 1;
  }
}
if (disableHits) {
  process.exit(1);
}

const canary = join(SRC, 'components/date-time-picker/date-time-picker.tsx');
const printed = execFileSync(
  process.execPath,
  [
    join(ROOT, 'node_modules/eslint/bin/eslint.js'),
    '--print-config',
    canary,
  ],
  { cwd: ROOT, encoding: 'utf8' }
);
const config = JSON.parse(printed);
const restricted = config.rules?.['no-restricted-imports'];
if (!restricted || restricted[0] === 'off') {
  console.error('no-restricted-imports is not enabled in printed ESLint config');
  process.exit(1);
}
const options = restricted[1] || {};
const pathNames = (options.paths || []).map((p) => p.name);
for (const required of ['react-input-mask', 'baseui/datepicker', 'baseui/input']) {
  if (!pathNames.includes(required)) {
    console.error(
      `Printed ESLint config missing no-restricted-imports path: ${required}`
    );
    process.exit(1);
  }
}

console.log('datepicker ban backstop OK');
