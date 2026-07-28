// Service Worker básico para caché offline
const CACHE_NAME = 'huarmey-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './image_0.png',
  'https://cdn.jsdelivr.net/npm/dexie@3.2.0/dist/dexie.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No en caché - descargar
        return fetch(event.request);
      }
    )
  );
});