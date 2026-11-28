// Offline cache for the static site files only.
// Clinical inputs never leave page memory: this worker caches public GET files
// from this site and never reads, stores, or sends form data.
const VERSION = 'v2.2.0';
const PREFIX = 'stroke-subtyping-';
const CACHE = `${PREFIX}${VERSION}`;

const PRECACHE = [
  './',
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
  'favicon.svg',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'assets/atlas/01-lacunar-svd.jpg',
  'assets/atlas/02-watershed-laa.jpg',
  'assets/atlas/03-multiterritory-ce.jpg',
  'assets/atlas/04-carotid-stenosis-sync.jpg',
  'assets/atlas/05-icad-vwi.jpg',
  'assets/atlas/06-dissection.jpg',
  'assets/atlas/07-carotid-web.jpg',
  'assets/atlas/08-moyamoya.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE.map(p => new Request(p, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first so an online device always gets the latest classification engine;
// the cache is only the offline fallback. Query strings (?lang=en) are ignored for lookup.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = url.origin + url.pathname;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') await cache.put(key, res.clone());
      return res;
    } catch (err) {
      const hit = await cache.match(key) || await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const fallback = await cache.match('index.html');
        if (fallback) return fallback;
      }
      throw err;
    }
  })());
});
