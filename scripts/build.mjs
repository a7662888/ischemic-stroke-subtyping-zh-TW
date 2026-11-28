import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

const assets = [
  'index.html',
  'guide.html',
  'styles.css',
  'app.js',
  'guide.js',
  'calculator.js',
  'data.js',
  'glossary.js',
  'i18n.js',
  'site-meta.js',
  'pwa.js',
  'sw.js',
  'manifest.webmanifest',
  'favicon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];
const check = process.argv.includes('--check');

await mkdir(new URL('../docs/assets/atlas/', import.meta.url), { recursive: true });
await mkdir(new URL('../docs/icons/', import.meta.url), { recursive: true });

for (const file of assets) {
  const source = await readFile(new URL(`../${file}`, import.meta.url));
  const target = new URL(`../docs/${file}`, import.meta.url);
  if (check) {
    const existing = await readFile(target);
    if (!source.equals(existing)) throw new Error(`Stale published asset: ${file}`);
  } else {
    await writeFile(target, source);
  }
}

const atlasFiles = (await readdir(new URL('../assets/atlas/', import.meta.url))).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
for (const img of atlasFiles) {
  const source = await readFile(new URL(`../assets/atlas/${img}`, import.meta.url));
  const target = new URL(`../docs/assets/atlas/${img}`, import.meta.url);
  if (check) {
    const existing = await readFile(target);
    if (!source.equals(existing)) throw new Error(`Stale atlas asset: ${img}`);
  } else {
    await writeFile(target, source);
  }
}

if (!check) await writeFile(new URL('../docs/.nojekyll', import.meta.url), '');
console.log(check ? `Published assets (${assets.length} files + ${atlasFiles.length} atlas images) match source.` : `Synchronized ${assets.length} files + ${atlasFiles.length} atlas images to docs/.`);
