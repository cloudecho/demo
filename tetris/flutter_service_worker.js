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
"flutter_bootstrap.js": "e83c33b115466c30c259fed9c4454094",
"index.html": "4a95c069392508ec8f1a834714050b94",
"/": "4a95c069392508ec8f1a834714050b94",
"main.dart.js": "f78e5d259f6fdb5db8273e93789aab9c",
"version.json": "eb02119becf85d22f6359d3315588102",
"assets/assets/images/holder": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/music/ambient-piano-and-strings-10711.mp3": "9d0a7365e2f9aecc790b48ef287da6d1",
"assets/assets/sfx/click_effect-86995.mp3": "68ab68ec2d343716a572c9ddbbfc91d8",
"assets/assets/sfx/clickselect2-92097.mp3": "a252b6a1c1a7e07f7ba0f4226db3112b",
"assets/assets/sfx/cute-level-up-3-189853.mp3": "c16fd60869ffb4675bd3fa2161603d0a",
"assets/assets/sfx/happy-pop-1-185286.mp3": "295f8aee8127bb86626e8c9b901c6680",
"assets/assets/sfx/happy-pop-2-185287.mp3": "fa9ab470ef8c7d83238f29072bf00bfd",
"assets/assets/sfx/kl-peach-game-over-iii-142453.mp3": "626de560e8984ad1596509927d664dc8",
"assets/assets/sfx/ui-pop-up-4-197890.mp3": "ab6a9a53d33a255d2a26312e5155cdd8",
"assets/assets/sfx/usb-slide-back-106529.mp3": "af6056b04b210790845a4aa82c55dc66",
"assets/assets/sfx/you-win-sequence-1-183948.mp3": "98b196d17a58cd5d1dba5b021ad8aeae",
"assets/assets/sfx/select-sound-121244.mp3": "f00692baa141fa9ee2f2c8e56cacd0c4",
"assets/assets/icon.png": "a70acfe21d776dd258f82422e892fd14",
"assets/google_fonts/SeymourOne-Regular.ttf": "66d6b74e064e99622527bba4d882a2cd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "704e4d5e731ded5e2b3243d093f9d4ad",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "8ee3a61c1fc7b8c87196db2a1c103d61",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "adb83bf99fd33a44eee0feaf3e5180f6",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "aede002068a38a9e8846fee6b4d42f73",
"assets/fonts/MaterialIcons-Regular.otf": "13fdd33346379109d9b4b32723e813b3",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "e0c082da10ff03dcac0c4bd573c6af22",
"assets/AssetManifest.bin": "6f54130b0f31d8f4be8266ce96b1a14d",
"assets/AssetManifest.bin.json": "5e12f6f9a7a2b5dd6293fb74cc8ac13b",
"assets/NOTICES": "b805d9b5189a326bdad2aef377e3e110",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"favicon.png": "e4f9033d1dc69bdb5450df39fb57909c",
"icons/Icon-192.png": "2d82a80b2a8816e16080c353c76f1ee6",
"icons/Icon-512.png": "5182226ae3a9b80508abe06418f31765",
"icons/Icon-maskable-192.png": "2d82a80b2a8816e16080c353c76f1ee6",
"icons/Icon-maskable-512.png": "5182226ae3a9b80508abe06418f31765",
"manifest.json": "cb82a0945cf6d90259bdc393aceb65f4"};
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
