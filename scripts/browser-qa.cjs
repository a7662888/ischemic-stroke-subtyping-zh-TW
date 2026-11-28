// Local & live synthetic-input browser & multi-device visual QA for index.html and guide.html.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');

const target = process.argv[2] || 'http://127.0.0.1:8792/';
const out = process.argv[3] || 'qa';
const baseUrl = target.endsWith('/') ? target : `${target}/`;

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

  // --- 1. Test index.html ---
  const response = await page.goto(baseUrl);
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => document.querySelectorAll('#cardiac-checklist input').length === 23);
  // Let the offline service worker finish installing before counting interaction requests.
  const swScope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
  assert.equal(swScope, baseUrl);
  await page.waitForLoadState('networkidle'); // favicon is fetched lazily after load
  await page.waitForTimeout(500);

  const requestCountAfterLoad = requests.length;

  // Test all 5 vignettes in zh-TW
  await page.locator('#example-select').selectOption('competing_laa_af');
  assert.match(await page.locator('#toast-label').innerText(), /UD-Multiple/);
  assert.match(await page.locator('#ccs-5').innerText(), /Probable/);
  await page.screenshot({ path: `${out}/desktop-1440.png` });

  // Test bilingual toggle to English + interactive tooltip
  await page.locator('#lang-toggle').click();
  assert.equal(await page.locator('#lang-toggle').getAttribute('aria-pressed'), 'true');
  assert.match(await page.locator('#hero-h1').innerText(), /Computerized Ischemic Stroke/);
  assert.match(await page.locator('#toast-label').innerText(), /Undetermined/);
  await page.locator('label[data-glossary="infarctPattern"] .info-tip').click();
  assert.equal(await page.locator('#glossary-popover').isVisible(), true);
  assert.match(await page.locator('#glossary-popover').innerText(), /15 mm vs 20 mm/);
  await page.screenshot({ path: `${out}/desktop-en-tooltip.png` });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#glossary-popover').isVisible(), false);

  // Switch back to zh-TW
  await page.locator('#lang-toggle').click();
  assert.equal(await page.locator('#lang-toggle').getAttribute('aria-pressed'), 'false');

  // Verify DOI links on index.html
  const doiCount = await page.locator('#citations-list a[href^="https://doi.org/"][rel="noopener noreferrer"]').count();
  assert.ok(doiCount >= 14, `Expected >=14 DOI links, got ${doiCount}`);

  // Verify zero requests & zero storage on form interaction
  await page.locator('#reset').click();
  // Changing ?lang= makes Chrome re-request the favicon; with the service worker in control that GET is
  // visible here. Anything else (or any request carrying a query string / body) is a failure.
  const interactionRequests = requests.slice(requestCountAfterLoad);
  assert.ok(
    interactionRequests.every(r => r.method === 'GET' && new URL(r.url).pathname.endsWith('/favicon.svg') && !new URL(r.url).search),
    `Form interactions must not trigger data requests: ${JSON.stringify(interactionRequests)}`
  );
  assert.equal(requests.some(r => r.method !== 'GET'), false);
  assert.equal(requests.some(r => new URL(r.url).origin !== new URL(baseUrl).origin), false);

  const storage = await page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
    cookie: document.cookie,
    serviceWorkerRegistered: !!navigator.serviceWorker?.controller || !!document.querySelector('script[src="pwa.js"]')
  }));
  assert.deepEqual(storage, { local: 0, session: 0, cookie: '', serviceWorkerRegistered: true });

  // Multi-device viewport checks on index.html (with tooltip open on mobile!)
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
    if (vp.name === 'mobile-port-390') {
      await page.locator('label[data-glossary="syndrome"] .info-tip').click();
      assert.equal(await page.locator('#glossary-popover').isVisible(), true);
    }
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
    viewportMetrics.push({ page: 'index', name: vp.name, ...check });
    await page.screenshot({ path: `${out}/${vp.name}.png` });
    if (vp.name === 'mobile-port-390') {
      await page.keyboard.press('Escape');
      await page.locator('#result-panel').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${out}/mobile-390-result.png` });
    }
  }

  // --- 2. Test guide.html (Manual + Real Clinical Neuroimaging Atlas) ---
  await page.setViewportSize({ width: 1440, height: 1100 });
  const guideResp = await page.goto(`${baseUrl}guide.html`);
  assert.equal(guideResp.status(), 200);
  await page.waitForFunction(() => document.querySelectorAll('#atlas-grid .atlas-card').length === 8);

  // Scroll through atlas so lazy images load and verify all 8 real scans
  await page.locator('#atlas').scrollIntoViewIfNeeded();
  for (let i = 0; i < 8; i++) {
    await page.locator('#atlas-grid .atlas-card img').nth(i).scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() => {
    const imgs = [...document.querySelectorAll('#atlas-grid img')];
    return imgs.length === 8 && imgs.every(im => im.complete && im.naturalWidth > 100);
  });

  await page.screenshot({ path: `${out}/guide-atlas.png` });

  // Test lightbox zoom
  await page.locator('#atlas-grid .atlas-img-btn').first().click();
  assert.equal(await page.locator('#atlas-lightbox').evaluate(d => d.open), true);
  await page.locator('#lb-close').click();
  assert.equal(await page.locator('#atlas-lightbox').evaluate(d => d.open), false);

  // Test atlas filter + bilingual toggle on guide.html
  await page.locator('#f-brain').click();
  assert.equal(await page.locator('#atlas-grid .atlas-card').count(), 3);
  await page.locator('#f-vascular').click();
  assert.equal(await page.locator('#atlas-grid .atlas-card').count(), 5);
  await page.locator('#f-all').click();
  assert.equal(await page.locator('#atlas-grid .atlas-card').count(), 8);

  await page.locator('#lang-toggle').click();
  assert.match(await page.locator('#g-h1').innerText(), /Ischemic Stroke Etiologic Classification Manual/);
  await page.locator('#ccs').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${out}/guide-en-ccs.png` });

  // Mobile check on guide.html
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#atlas').scrollIntoViewIfNeeded();
  const guideMobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth
  }));
  assert.equal(guideMobile.overflow, false, `guide.html mobile overflow: ${guideMobile.scrollWidth} > ${guideMobile.innerWidth}`);
  await page.screenshot({ path: `${out}/guide-mobile-390.png` });

  // --- 3. PWA: manifest, cache contents, and offline launch ---
  const manifestResp = await context.request.get(`${baseUrl}manifest.webmanifest`);
  assert.equal(manifestResp.status(), 200);
  const manifest = await manifestResp.json();
  assert.equal(manifest.display, 'standalone');
  for (const icon of manifest.icons) {
    assert.equal((await context.request.get(new URL(icon.src, baseUrl).href)).status(), 200, icon.src);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl);
  const cache = await page.evaluate(async () => {
    const keys = await caches.keys();
    const c = await caches.open(keys.find(k => k.startsWith('stroke-subtyping-')));
    return { names: keys, entries: (await c.keys()).length, controlled: !!navigator.serviceWorker.controller };
  });
  assert.equal(cache.names.length, 1, `Expected one versioned cache, got ${cache.names}`);
  assert.ok(cache.entries >= 26, `Expected >=26 cached files, got ${cache.entries}`);
  assert.equal(cache.controlled, true, 'Page should be controlled by the service worker');

  await context.setOffline(true);
  await page.goto(`${baseUrl}index.html?lang=en`);
  await page.waitForFunction(() => document.querySelectorAll('#cardiac-checklist input').length === 23);
  await page.locator('#example-select').selectOption('competing_laa_af');
  assert.match(await page.locator('#toast-label').innerText(), /Undetermined/);
  await page.screenshot({ path: `${out}/offline-mobile-390.png` });
  await page.goto(`${baseUrl}guide.html`);
  await page.locator('#atlas').scrollIntoViewIfNeeded();
  for (let i = 0; i < 8; i++) await page.locator('#atlas-grid .atlas-card img').nth(i).scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('#atlas-grid img')].every(im => im.complete && im.naturalWidth > 100));
  await context.setOffline(false);
  const pwa = { manifest: manifest.short_name, cacheEntries: cache.entries, offlineIndex: 'PASS', offlineGuideAtlas: 'PASS' };

  assert.deepEqual(errors, []);

  const report = {
    target: baseUrl,
    checkedAt: new Date().toISOString(),
    status: 'PASS',
    viewportMetrics,
    guideMobile,
    atlasImagesLoaded: 8,
    doiLinksOnIndex: doiCount,
    storage,
    pwa,
    assetRequests: requests.length
  };
  await fs.writeFile(`${out}/browser-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
