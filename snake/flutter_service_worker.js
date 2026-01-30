'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "479afb3b3e9f212549aeeaf342830291",
"index.html": "da586aeae0e0e00c7046730fa935f9db",
"/": "da586aeae0e0e00c7046730fa935f9db",
"main.dart.js": "10a3702384097794a3b11cc42816625e",
"version.json": "a0963e0442b472de6a1b2006eef74013",
"assets/assets/images/sprites.png": "aa3ab343a72811a6375666bdbd36c910",
"assets/assets/images/food/food.png": "d011a4d4d20fd8df2019481849e125bd",
"assets/assets/images/food/red_food.png": "3c2b8e465d826fde237ce8a8d3f448af",
"assets/assets/images/sprites2.png": "36362434ffd5d6f45d84f9907f24fd10",
"assets/assets/images/snake/body.png": "8057127c8a931baa7713ca9b8d358b79",
"assets/assets/images/snake/body_curve.png": "568217bcbf25de3ca1aa3e2a80307cbd",
"assets/assets/images/snake/head.png": "b1bbaa6d2991c7538bdbe0d357bd03f4",
"assets/assets/images/snake/tail.png": "08c88b05086cb0ccb2a69af72e5fd9eb",
"assets/assets/audio/8-bit-video-game-lose-sound-version-1-145828.mp3": "ae3051e53ce7ff6c4b14169174dc7d44",
"assets/assets/audio/coin-recieved-230517.mp3": "65a2b0819023b28c08dd6d324e746de0",
"assets/assets/audio/retro-coin-4-236671.mp3": "1001794fcd4865994d104b7f73cefc2e",
"assets/assets/audio/game-music-loop-6-144641.mp3": "685716d42a00a7bcf2242c13e66c4b51",
"assets/assets/audio/you-win-sequence-1-183948.mp3": "98b196d17a58cd5d1dba5b021ad8aeae",
"assets/assets/audio/game-music-loop-1-143979.mp3": "673cb7e7c4b45187290e86c18153d79c",
"assets/assets/audio/game-music-loop-9-145494.mp3": "0510376e815909b76851ebbee8c56879",
"assets/assets/audio/game-music-loop-20-156390.mp3": "c7c82b13fa92f5d653ac2e86196952d4",
"assets/assets/audio/game-music-loop-16-153389.mp3": "9029dba8e828057487654f6a801ab2ce",
"assets/assets/audio/game-music-loop-11-147156.mp3": "d85565c410e29f6bef7dea281060da63",
"assets/assets/audio/game-music-loop-10-145572.mp3": "c89f48df19fa60dab6aa658db575b532",
"assets/assets/audio/e-oh-91679.mp3": "d354a9d429ebc952ac20f69568f096bd",
"assets/assets/icon.jpg": "4d2d81b73e90ed2828d8f9a9b4099b6c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "15d54d142da2f2d6f2e90ed1d55121af",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "262525e2081311609d1fdab966c82bfc",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "6f8a2e83952de4a48c835b5019b8581c",
"assets/fonts/MaterialIcons-Regular.otf": "25032c0cf83c0179389a4e8a2bbabf65",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "6862d4234f71dc0ea181580056db3766",
"assets/AssetManifest.bin": "097226e98369dc37ea8983d792ed10ea",
"assets/AssetManifest.bin.json": "20d78abf6e86237fd55763592cb313f8",
"assets/FontManifest.json": "3ddd9b2ab1c2ae162d46e3cc7b78ba88",
"assets/NOTICES": "588f0da63cc73493dc56741853b178d5",
"icons/Icon-192.png": "8f1f47a663565c415ace5ed9434a6590",
"icons/Icon-512.png": "b7a4bac4f81ebf3969567f11987d1543",
"icons/Icon-maskable-192.png": "8f1f47a663565c415ace5ed9434a6590",
"icons/Icon-maskable-512.png": "b7a4bac4f81ebf3969567f11987d1543",
"favicon.png": "44eb8a349b0c3cb3bf27fbf00091d5c7",
"manifest.json": "9a76e243c9c467b3e5603d4fac75fa5e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
