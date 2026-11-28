// Installable / offline support. Registers the service worker that caches the
// public site files; it never touches clinical inputs.
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {
      // Offline support is optional; the calculator works without it.
    });
  });
}

// When launched from the home screen, keep the manual inside the app window
// instead of opening an external browser tab.
const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
if (standalone) {
  for (const link of document.querySelectorAll('a[target="_blank"]')) {
    if (new URL(link.href, location.href).origin === location.origin) link.removeAttribute('target');
  }
}
