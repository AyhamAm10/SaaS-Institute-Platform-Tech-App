/* Web push of the installed web app (iPhone home screen, Android / desktop browsers).
 * Firebase shows pushes that arrive while the app is closed and opens their link
 * when tapped. Pushes shown by the open app (foreground) carry `data.link`. */
/* global importScripts, firebase, clients */
importScripts('https://www.gstatic.com/firebasejs/13.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/13.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDdPM323_6aNj_x4KQwU4y2BphqEjLAjaI',
  authDomain: 'jil-salam-institute.firebaseapp.com',
  projectId: 'jil-salam-institute',
  storageBucket: 'jil-salam-institute.firebasestorage.app',
  messagingSenderId: '36368609957',
  appId: '1:36368609957:web:365b7041cc0b73caa6934c',
});
firebase.messaging();

self.addEventListener('notificationclick', (event) => {
  const link = event.notification.data && event.notification.data.link;
  if (!link) return; // a Firebase-shown push: Firebase opens its own link
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => w.url.startsWith(self.registration.scope));
      if (open) return open.focus().then((w) => w.navigate(link));
      return clients.openWindow(link);
    }),
  );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
