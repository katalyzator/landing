/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/style.min.css","bc602e8822f4f2a084c2bfbe81946734"],["/fonts/ElMessiri-Bold/ElMessiri-Bold.eot","8fff57e9a7f8ce95224937e0c52f4353"],["/fonts/ElMessiri-Bold/ElMessiri-Bold.svg","c4f617f0b4d50174d084ef6ea63fad9d"],["/fonts/ElMessiri-Bold/ElMessiri-Bold.ttf","78cdd2780cdcf2aa90c877cf67d8932d"],["/fonts/ElMessiri-Bold/ElMessiri-Bold.woff","348f8ba6061e3f010d87e55c1d5a54f3"],["/fonts/ElMessiri-Bold/preview.html","1e8dfa8b8a4c8630c3ba1ef04e8e0517"],["/fonts/ElMessiri-Bold/styles.css","24e8cb5f01e77e5b51fb71346be94a65"],["/fonts/ElMessiri-Medium.ttf","105d62ad1ec552a156da5bf036100ca3"],["/fonts/ElMessiri-Regular.ttf","d57b5ade47dcfc003f70ec9e57faba87"],["/fonts/ElMessiri-SemiBold.ttf","69f64f26d4f97b15c5512764adff2944"],["/fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["/fonts/Material-Design-Iconic-Font.eot","e833b2e2471274c238c0553f11031e6a"],["/fonts/Material-Design-Iconic-Font.svg","381f7754080ed2299a7c66a2504dff02"],["/fonts/Material-Design-Iconic-Font.ttf","b351bd62abcd96e924d9f44a3da169a7"],["/fonts/Material-Design-Iconic-Font.woff","d2a55d331bdd1a7ea97a8a1fbb3c569c"],["/fonts/Material-Design-Iconic-Font.woff2","a4d31128b633bc0b1cc1f18a34fb3851"],["/fonts/MuseoSansBlack/MuseoSansBlack.eot","9d94b7eaedb634be56f0718ee3c0d2c2"],["/fonts/MuseoSansBlack/MuseoSansBlack.ttf","1808b5f6b2dd330757f13c6dc3ddf32a"],["/fonts/MuseoSansBlack/MuseoSansBlack.woff","d403436eee6af142bb056eaecb76805d"],["/fonts/MuseoSansBlackItalic/MuseoSansBlackItalic.eot","a35410eaecad6f342fa94c4d7393f87d"],["/fonts/MuseoSansBlackItalic/MuseoSansBlackItalic.otf","2b3b87a2a82e82dee6a04fdd8aca3208"],["/fonts/MuseoSansBlackItalic/MuseoSansBlackItalic.ttf","0a5b4020e8b4c21f2eafd080fb5616a7"],["/fonts/MuseoSansBlackItalic/MuseoSansBlackItalic.woff","54b8596581343128cd3e84786c1a6cbb"],["/fonts/MuseoSansBold/MuseoSansBold.eot","b6a25a9b8ae3bd903f71a761f1a6e4bd"],["/fonts/MuseoSansBold/MuseoSansBold.ttf","2f1535ec92e27193cc13e35495cd845e"],["/fonts/MuseoSansBold/MuseoSansBold.woff","6a54f6727e1dfd8538bbb4ab224c311f"],["/fonts/MuseoSansBoldItalic/MuseoSansBoldItalic.eot","c88b6f44bf2804a3004d89123bca31e6"],["/fonts/MuseoSansBoldItalic/MuseoSansBoldItalic.ttf","a73499db7228ae1cfea844211563bb56"],["/fonts/MuseoSansBoldItalic/MuseoSansBoldItalic.woff","752db9aaf13e3ceebe68aff07d9c1ec1"],["/fonts/MuseoSansItalic/MuseoSansItalic.eot","35922fc68d49749684a73cc9621aa7d8"],["/fonts/MuseoSansItalic/MuseoSansItalic.ttf","5d8cd4ac0155fb225e6cf98fcc4be228"],["/fonts/MuseoSansItalic/MuseoSansItalic.woff","0b5c3627daf33aae8b4d2c9976f38300"],["/fonts/MuseoSansLight/MuseoSansLight.eot","e8adc41247ec44f51d1cead8fdf45b73"],["/fonts/MuseoSansLight/MuseoSansLight.ttf","3258ca8bb3a1861325c63ec376c3941a"],["/fonts/MuseoSansLight/MuseoSansLight.woff","e386bd26958d7169f69e43d56416a1fd"],["/fonts/MuseoSansLightItalic/MuseoSansLightItalic.eot","0ce9f116758d48a1494ec25c0bf92712"],["/fonts/MuseoSansLightItalic/MuseoSansLightItalic.ttf","e18c9957f7875aef8a74fe577ee3ac38"],["/fonts/MuseoSansLightItalic/MuseoSansLightItalic.woff","b71e680a0e5005382d72b2e491c22375"],["/fonts/MuseoSansMedium/MuseoSansMedium.eot","2bac225e7c716a3569ae1bea77655910"],["/fonts/MuseoSansMedium/MuseoSansMedium.ttf","e1edf31751b631539c754a498a968d89"],["/fonts/MuseoSansMedium/MuseoSansMedium.woff","db1355d5917b9e8bbc77aff8a22b9574"],["/fonts/MuseoSansMediumItalic/MuseoSansMediumItalic.eot","e0d93917699a3f5e7015f7dcd3a51f4b"],["/fonts/MuseoSansMediumItalic/MuseoSansMediumItalic.ttf","a931eab55edea221b1f1c97e16ebad7a"],["/fonts/MuseoSansMediumItalic/MuseoSansMediumItalic.woff","0f21dc2281484d8dfddfa088b4c20795"],["/fonts/MuseoSansRegular/MuseoSansRegular.eot","f30df4fe1c424f83e83faae7c4a13db9"],["/fonts/MuseoSansRegular/MuseoSansRegular.ttf","ef3daa6f0cfcb6366ada64dbbaa6501d"],["/fonts/MuseoSansRegular/MuseoSansRegular.woff","b3e4dd558860efbe20dd27e5fbb66d73"],["/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/fonts/lg.eot","ecff11700aad0000cf3503f537d1df17"],["/fonts/lg.svg","98d62b1e5f5b556facf319b19c6c7cba"],["/fonts/lg.ttf","4fe6f9caff8b287170d51d3d71d5e5c6"],["/fonts/lg.woff","5fd4c338c1a1b1eeeb2c7b0a0967773d"],["/img/favicon.ico","57e828c8baba6af51a7f279122f483f8"],["/img/jpg/banner.jpg","e8dba9dea0bab663195d2fbea754c3a3"],["/img/jpg/banner2.jpg","1b2668762ddd782b554189ef2db431a6"],["/img/jpg/bl.jpg","0dbb4f02dde76a01be78259901a61b29"],["/img/jpg/br.jpg","5b9dfb33dc6e8b89e9dece56b5b93b13"],["/img/jpg/human.jpg","c6f37724ecefc38c4fe48b844f05dc01"],["/img/jpg/number.jpg","093d0fac6c0dee06004b7e24e314a1d8"],["/img/png/android-chrome-192x192.png","e0ddaf9ee95c6f824f85869212742862"],["/img/png/android-chrome-384x384.png","2cefa2fd66e77c65be6093e3ff88d023"],["/img/png/apple-touch-icon.png","32f11355283c7acdedf7119022123961"],["/img/png/bgvideo.png","71070d4f4099327512aa89f3bfeaf5dd"],["/img/png/book.png","fb7cb8289576d636a788c2140ec0eb0d"],["/img/png/browserconfig.xml","a493ba0aa0b8ec8068d786d7248bb92c"],["/img/png/bsb-logo.png","d936857adfae41cd6c98e88e626794ee"],["/img/png/calendar.png","a5e10c15a584b0955551889eeab6ce08"],["/img/png/cont.png","b5cc28a6cd89105359c0fa3966264f01"],["/img/png/f1.png","814d361b6c69a2ebe2c5b576819f70f2"],["/img/png/favicon-16x16.png","ef99e6a88b5ff991cdc0f825637596c7"],["/img/png/favicon-32x32.png","4d300541863790ad5929563a476e6897"],["/img/png/favicon.ico","57e828c8baba6af51a7f279122f483f8"],["/img/png/fb.png","c3b6a1b61181bfe2fdd9f15a604c9175"],["/img/png/h3b.png","1bce2e184469df25c95feb0f19c8d8ad"],["/img/png/h3t.png","afd4e833a3a145541ce6aed40a8bb675"],["/img/png/human.png","3273f4d7ed90ddf11d8dea1f841dc9a2"],["/img/png/human2.png","970db33398da9a1ecb10d29804a5a294"],["/img/png/m1.png","b1a55e0f103ee6ff4d8c0342ec3fda98"],["/img/png/m2.png","95152c098a40b57c070de8c778893f96"],["/img/png/m3.png","821fc7a09ef58cfbde8806e40b24737e"],["/img/png/m4.png","fc180b558dbc789539691e04280a8a24"],["/img/png/m5.png","b4fbf3b399394cbd0cd83525706f7150"],["/img/png/map.png","1f85292ec7f7d261d964a4200652d31c"],["/img/png/modal.png","dfb463216778a269ed2cb6342bcfca44"],["/img/png/modal1.png","ccc86706b11d4fcf8e56de3354ce046f"],["/img/png/mstile-150x150.png","21356708e364271374440540dac331d1"],["/img/png/play.png","29a218cb3e9ca2387ecf51d3e3402db9"],["/img/png/safari-pinned-tab.svg","71521f19a91653dfe0239c1b9f72d454"],["/img/png/sfb.png","3ee81f9e971da1e82dc7b1dde9870b71"],["/img/png/sin.png","324a9f952780237ee6d425844206c662"],["/img/png/site.webmanifest","57425a403714747b47dd0c0b3524a5f1"],["/img/png/sl1.png","a5122ebade5ac1f26e492448d2644f7c"],["/img/png/sl2.png","249fc878195d9d3698b3c988f25ac5bb"],["/img/png/sl3.png","1e1fabb97044b2193498397c4507ad11"],["/img/png/sl4.png","39e47cb5cd1d35fbe61684368dadd40d"],["/img/png/topic.png","a38ccb59068b0201c19bb228608402e5"],["/img/png/up.png","e972c2a63b246ad658fde408aeef4a2b"],["/img/png/v1.png","900e3b8da02829609fba3208590ef8aa"],["/img/png/v2.png","7a3d8685a804f589bc452b0c27bd4112"],["/img/png/v3.png","741342f79d9ff4b7dde47688a5b84141"],["/index.html","7432b52b3216988a60e4be7ca84642d2"],["/js/common.min.js","b8dd7fe51996d1266f85ae89ed702be2"],["/js/libs.min.js","0e143af6cef968707c066cc3855392e7"],["/manifest.json","cd97fb57f20e6b285fc5398738a312e3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







