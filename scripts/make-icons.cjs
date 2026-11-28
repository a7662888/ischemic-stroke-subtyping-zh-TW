// Render PWA PNG icons from the SVG sources (favicon.svg, icon-maskable.svg).
// Usage: PLAYWRIGHT_MODULE=<path to playwright> node scripts/make-icons.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.join(__dirname, '..');
const outputs = [
  { src: 'favicon.svg', out: 'icons/icon-192.png', size: 192 },
  { src: 'favicon.svg', out: 'icons/icon-512.png', size: 512 },
  { src: 'icon-maskable.svg', out: 'icons/icon-maskable-512.png', size: 512 },
  // iOS ignores transparency and adds its own rounding, so use the full-bleed artwork.
  { src: 'icon-maskable.svg', out: 'icons/apple-touch-icon.png', size: 180 }
];

(async () => {
  await fs.mkdir(path.join(root, 'icons'), { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  for (const { src, out, size } of outputs) {
    const svg = await fs.readFile(path.join(root, src), 'utf8');
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(
      `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`
    );
    await page.locator('svg').screenshot({ path: path.join(root, out), omitBackground: true });
    await page.close();
    console.log(`${out} (${size}x${size})`);
  }
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
