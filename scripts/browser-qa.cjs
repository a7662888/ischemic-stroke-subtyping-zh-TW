// Local synthetic-input browser & multi-device visual QA. No real patient data.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');

const target = process.argv[2] || 'http://127.0.0.1:8792/';
const out = process.argv[3] || 'qa';

(async () => {
  await fs.mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const errors = [];
  const requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => requests.push({ url: r.url(), method: r.method() }));

  const response = await page.goto(target);
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => document.querySelectorAll('#cardiac-checklist input').length === 23);

  const requestCountAfterLoad = requests.length;

  // Test all 5 vignettes
  await page.locator('#example-select').selectOption('competing_laa_af');
  assert.match(await page.locator('#toast-label').innerText(), /UD-Multiple/);
  assert.match(await page.locator('#ccs-5').innerText(), /Probable/);
  assert.equal(await page.locator('#ascod-strip').innerText(), 'A1\n致病\nS0\n無\nC1\n致病\nO0\n無\nD0\n無');

  await page.screenshot({ path: `${out}/desktop-1440.png` });

  await page.locator('#example-select').selectOption('young_pfo_pascal');
  assert.equal(await page.locator('#pfo-box').isVisible(), true);
  assert.match(await page.locator('#pfo-box').innerText(), /RoPE 分數：9 \/ 10/);
  assert.match(await page.locator('#pfo-box').innerText(), /Probable/);

  await page.locator('#example-select').selectOption('lacunar_18mm_boundary');
  assert.match(await page.locator('#toast-label').innerText(), /UD-Negative/);
  assert.match(await page.locator('#ccs-5').innerText(), /小動脈阻塞/);
  assert.match(await page.locator('#ascod-strip').innerText(), /S0/);

  await page.locator('#example-select').selectOption('carotid_dissection');
  assert.match(await page.locator('#toast-label').innerText(), /\[OD\]/);
  assert.match(await page.locator('#ascod-strip').innerText(), /D1/);

  await page.locator('#example-select').selectOption('esus_sync_web');
  assert.match(await page.locator('#toast-label').innerText(), /UD-Negative/);
  assert.match(await page.locator('#ccs-5').innerText(), /大動脈粥樣硬化/);
  assert.match(await page.locator('#modern-flags').innerText(), /SyNC/);

  // Test dynamic cancer subfields
  await page.locator('#activeCancer').selectOption('yes');
  assert.equal(await page.locator('.cancer-sub').first().isVisible(), true);

  // Test reset & zero requests
  await page.locator('#reset').click();
  assert.equal(await page.locator('#pfo-box').isVisible(), false);
  assert.equal(requests.length, requestCountAfterLoad, 'Form interactions must trigger zero network requests');
  assert.equal(requests.some(r => r.method !== 'GET'), false);
  assert.equal(requests.some(r => new URL(r.url).origin !== new URL(target).origin), false);

  const storage = await page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
    cookie: document.cookie,
    serviceWorker: !!navigator.serviceWorker?.controller
  }));
  assert.deepEqual(storage, { local: 0, session: 0, cookie: '', serviceWorker: false });

  // Multi-device viewport checks
  const viewports = [
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-land-844', width: 844, height: 390 },
    { name: 'mobile-port-390', width: 390, height: 844 },
    { name: 'mobile-320', width: 320, height: 740 }
  ];

  const viewportMetrics = [];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.locator('#example-select').selectOption('young_pfo_pascal');
    const check = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      let minFont = 999;
      for (const el of document.querySelectorAll('body, p, li, label, select, button, td, th, span, small')) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const fs = parseFloat(style.fontSize);
        if (fs > 0 && fs < minFont) minFont = fs;
      }
      return { overflow, scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, minFont };
    });
    assert.equal(check.overflow, false, `Horizontal overflow at ${vp.name}: ${check.scrollWidth} > ${check.innerWidth}`);
    assert.ok(check.minFont >= 12, `Font size below 12px at ${vp.name}: ${check.minFont}px`);
    viewportMetrics.push({ name: vp.name, ...check });
    await page.screenshot({ path: `${out}/${vp.name}.png` });
    if (vp.name === 'mobile-port-390') {
      await page.locator('#result-panel').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${out}/mobile-390-result.png` });
      await page.locator('#comparison').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${out}/mobile-390-table.png` });
    }
  }

  // Reload clears form
  await page.reload();
  await page.waitForFunction(() => document.querySelectorAll('#cardiac-checklist input').length === 23);
  assert.equal(await page.locator('#example-select').inputValue(), '');
  assert.deepEqual(errors, []);

  const report = {
    target,
    checkedAt: new Date().toISOString(),
    status: 'PASS',
    viewportMetrics,
    storage,
    assetRequests: requests.length
  };
  await fs.writeFile(`${out}/browser-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
