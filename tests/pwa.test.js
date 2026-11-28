import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = f => fs.readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const sw = read('sw.js');
const precache = [...sw.match(/const PRECACHE = \[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);

test('service worker cache version matches package version', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(sw.match(/const VERSION = '([^']+)'/)[1], `v${pkg.version}`);
  assert.match(read('data.js'), new RegExp(`VERSION = 'v${pkg.version.replace(/\./g, '\.')} `));
});

test('every precached file exists', () => {
  for (const p of precache.filter(p => p !== './')) {
    assert.ok(fs.existsSync(new URL(`../${p}`, import.meta.url)), `missing ${p}`);
  }
});

test('every published asset (except sw.js) is precached, including all atlas images', () => {
  const build = read('scripts/build.mjs');
  const assets = [...build.match(/const assets = \[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  for (const a of assets.filter(a => a !== 'sw.js')) assert.ok(precache.includes(a), `not precached: ${a}`);
  for (const img of fs.readdirSync(new URL('../assets/atlas/', import.meta.url))) {
    assert.ok(precache.includes(`assets/atlas/${img}`), `atlas not precached: ${img}`);
  }
});

test('service worker only handles same-origin GET and never reads request bodies', () => {
  assert.match(sw, /req\.method !== 'GET'\) return/);
  assert.match(sw, /url\.origin !== self\.location\.origin\) return/);
  assert.doesNotMatch(sw, /\.(formData|json|text|arrayBuffer)\(\)|postMessage|indexedDB|localStorage/);
});

test('manifest is valid and installable', () => {
  const m = JSON.parse(read('manifest.webmanifest'));
  assert.equal(m.display, 'standalone');
  assert.equal(m.start_url, './index.html');
  const sizes = m.icons.map(i => `${i.sizes}:${i.purpose}`);
  for (const need of ['192x192:any', '512x512:any', '512x512:maskable']) assert.ok(sizes.includes(need), need);
  for (const i of m.icons) assert.ok(fs.existsSync(new URL(`../${i.src}`, import.meta.url)), i.src);
});

test('both pages link the manifest, register pwa.js, and keep connect-src none', () => {
  for (const page of ['index.html', 'guide.html']) {
    const html = read(page);
    assert.match(html, /<link rel="manifest" href="manifest\.webmanifest">/);
    assert.match(html, /<link rel="apple-touch-icon" href="icons\/apple-touch-icon\.png">/);
    assert.match(html, /<script type="module" src="pwa\.js"><\/script>/);
    assert.match(html, /connect-src 'none'; manifest-src 'self'; worker-src 'self'/);
  }
});
