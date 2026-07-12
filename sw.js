/* 동건루틴 서비스워커 — 오프라인 지원 */
const CACHE = 'dgr-v1.3.0';
const ASSETS = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 항상 최신이어야 하는 것(앱 본체 html, 동기화 설정)은 네트워크 우선
  // + HTTP 캐시 재검증 강제(no-cache) → 배포 직후에도 바로 반영, 오프라인이면 캐시
  const isDoc = req.mode === 'navigate' || req.destination === 'document';
  const isConfig = url.origin === location.origin && url.pathname.endsWith('/firebase-config.js');
  if (isDoc || isConfig) {
    const cacheKey = isDoc ? './index.html' : './firebase-config.js';
    e.respondWith(
      fetch(req.url, { cache: 'no-cache' })
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(cacheKey, copy));
          return res;
        })
        .catch(() => caches.match(cacheKey))
    );
    return;
  }

  // 정적 자원 + Firebase SDK(gstatic)는 캐시 우선 → 오프라인에서도 동작
  const cacheable = url.origin === location.origin || url.hostname === 'www.gstatic.com';
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && cacheable) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});
