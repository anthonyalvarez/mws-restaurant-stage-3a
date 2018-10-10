var CONSOLE_LOG_ID = '[SERVICE-WORKER]';
const CACHE_NAME = 'D';
const CACHE_DYNAMIC_NAME = 'D';
CACHE_CONTAINING_ERROR_MESSAGES = 'Z';
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'restaurant.html',
  'serviceworker.js',
  'sw.js',
  '/js/idb.js',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/1-med.jpg',
  '/img/2-med.jpg',
  '/img/3-med.jpg',
  '/img/4-med.jpg',
  '/img/5-med.jpg',
  '/img/6-med.jpg',
  '/img/7-med.jpg',
  '/img/8-med.jpg',
  '/img/9-med.jpg',
  '/img/10-med.jpg',
  '/img/1-sm.jpg',
  '/img/2-sm.jpg',
  '/img/3-sm.jpg',
  '/img/4-sm.jpg',
  '/img/5-sm.jpg',
  '/img/6-sm.jpg',
  '/img/7-sm.jpg',
  '/img/8-sm.jpg',
  '/img/9-sm.jpg',
  '/img/10-sm.jpg',
  'manifest.json',
  '/img/icons-128.png',
  '/img/icons-144.png',
  '/img/icons-192.png',
  '/img/icons-256.png',
  '/img/icons-384.png',
  '/img/icons-48.png',
  '/img/icons-512.png',
  '/img/icons-96.png'
];

/**
 * @description Installs service worker for the first time, give it a name and populates it with cache date.
 * @param {object} event
 * @returns none - Installed Service worker
 */

self.addEventListener('install', function(evt) {
  let FUCNTION_ID = ' id #1 ';
  let FUCNTION_DESC = 'Install event';
  console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC);
  evt.waitUntil(precache());
});

function precache() {
  let FUCNTION_ID = ' id #2 ';
  let FUCNTION_DESC = 'Precache to cache name';
  console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC, CACHE_NAME);
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(URLS_TO_CACHE);
  });
}

/* self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
      .then(() => {
        console.log('SW Installed by ES6 arrow funtion');
        return self.skipWaiting();
      })
  );
});
 */
/**
 * @description Service worker is activating at this point and deletes old caches.
 * @param  {object} e
 * @returns none - Activated Service worker
 */

self.addEventListener('activate', e => {
  let FUCNTION_ID = ' id #3 ';
  let FUCNTION_DESC = 'Activate Event to cache name';
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }));
  // return self.clients.claim();
  console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC, CACHE_NAME);
});

/**
 * @description Intercepts all fetch requests. It will then respond with the cached response if one is found, if not it will fetch the data from network using the fetch API.
 * @param {object} event
 * @returns {object} event.request - Resource from cache or network
 */

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       console.log('SW Fetch Response', event.request);
//       return response || fetch(event.request);
//     })
//   );
// });
/*
self.addEventListener('fetch', function(evt) {
  let FUCNTION_ID = ' id #4 ';
  let FUCNTION_DESC = 'Fetch Event';
  // const DO_NOT_CACHE_LIST_A = 'browser-sync';
  // const DO_NOT_CACHE_LIST_B = 'chrome-extension';
  // if evt.request is on DO_NOT_FETCH_LIST then return fetch(event.request);
  // const S = evt.request.url;
  // const contains = DO_NOT_CACHE_LIST_A.contains(S) || DO_NOT_CACHE_LIST_B.contains(S);
  // console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC + 'Contains', contains);
  // S.includes(DO_NOT_CACHE_LIST);
  // if (contains === true) {
    evt.respondWith(fromCache(evt.request));
        evt.waitUntil(update(evt.request));
        console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC + 'Cache' , evt.request.url);
    // } else {
      // console.log(CONSOLE_LOG_ID + FUCNTION_ID + FUCNTION_DESC + 'Cloud' , S, contains);
      // return fetch(evt.request);

    });
 */

 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      console.log('[SERVICE-WORKER] from Cache', request.url);
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      var newRequest = request.clone();
      console.log('[SERVICE-WORKER] Update cache', newRequest.url);
      // do not fetch browser-sync
      // condition ? expr1 : expr2
      // if Response.url does not contain "browser-sync", then cache.put
      //

/*       if (contains === true) {
        const S = response.url;
        const contains = S.includes('browser-sync');
        console.log('browser-sync exist', S);

      } else {
        console.log('does not exist', S);
        return cache.put(request, response);
      }
 */      // return cache.put(request, response);
    });
  });
}


/* self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				var requestClone = e.request.clone();
				return fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(CACHE_NAME).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', e.request.url);

							// Return the response
							return response;

				        }); // end caches.open

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // end caches.match(e.request)
	); // end e.respondWith
}); */
