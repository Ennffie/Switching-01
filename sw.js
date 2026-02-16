const CACHE_NAME = 'mpf-app-v1';
const BASE_PATH = '/Switching-01';
const urlsToCache = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/icons/icon-72x72.png',
  BASE_PATH + '/icons/icon-96x96.png',
  BASE_PATH + '/icons/icon-128x128.png',
  BASE_PATH + '/icons/icon-144x144.png',
  BASE_PATH + '/icons/icon-152x152.png',
  BASE_PATH + '/icons/icon-192x192.png',
  BASE_PATH + '/icons/icon-384x384.png',
  BASE_PATH + '/icons/icon-512x512.png'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在緩存中找到，返回緩存
        if (response) {
          return response;
        }
        // 否則發起網絡請求
        return fetch(event.request);
      })
  );
});

// 更新 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
