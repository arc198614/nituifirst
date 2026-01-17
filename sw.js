
const CACHE_NAME = 'kherda-circle-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './assets/logo.png',
    './assets/officer.png'
];

self.addEventListener('install', event => {
    // Skip waiting to activate new SW immediately
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    // Claim clients immediately to control the page
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
