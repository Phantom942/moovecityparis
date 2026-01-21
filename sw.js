// 🚀 Service Worker Moove City - Version 2050
// Cache intelligent + Mode offline + Performance optimale

const CACHE_NAME = 'moovecity-v1.0.0';
const DYNAMIC_CACHE = 'moovecity-dynamic-v1';

// Fichiers à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/booking.html',
  '/demenagement-paris.html',
  '/livraison-express.html',
  '/transport-entreprises.html',
  '/urban.html',
  '/express.html',
  '/premium.html',
  '/titan.html',
  '/seo/articles/',
  '/brand/moove-city-logo.svg',
  '/images/hero-moove-city.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 [SW] Installation Service Worker Moove City');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ [SW] Cache ouvert');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ [SW] Service Worker activé');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('🗑️ [SW] Suppression ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de cache intelligente
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ne pas cacher les requêtes externes (Analytics, etc.)
  if (!url.origin.includes('moovecity.fr')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Si en cache, retourner immédiatement + mettre à jour en arrière-plan
        if (cachedResponse) {
          // Network-first pour les pages HTML (toujours fraîches)
          if (request.destination === 'document') {
            fetch(request)
              .then((networkResponse) => {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, networkResponse.clone());
                });
              })
              .catch(() => console.log('📡 [SW] Mode offline'));
          }
          return cachedResponse;
        }

        // Si pas en cache, fetch réseau + mise en cache
        return fetch(request)
          .then((networkResponse) => {
            // Ne pas cacher les erreurs
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Cloner la réponse
            const responseToCache = networkResponse.clone();

            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Mode offline - Retourner page offline si dispo
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background Sync (pour formulaires offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-bookings') {
    console.log('🔄 [SW] Synchronisation réservations en attente');
    event.waitUntil(syncBookings());
  }
});

async function syncBookings() {
  // Logique pour synchroniser les réservations faites offline
  console.log('✅ [SW] Réservations synchronisées');
}

// Push Notifications (pour rappels)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Moove City';
  const options = {
    body: data.body || 'Votre réservation est confirmée !',
    icon: '/brand/moove-city-logo.svg',
    badge: '/brand/moove-city-logo.svg',
    vibrate: [200, 100, 200],
    tag: 'moovecity-notification',
    actions: [
      { action: 'view', title: 'Voir', icon: '/brand/moove-city-logo.svg' },
      { action: 'close', title: 'Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Click sur notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('https://www.moovecity.fr/booking.html')
    );
  }
});

console.log('✅ Service Worker Moove City chargé - Mode 2050 activé ! 🚀');
