// firebase-messaging-sw.js
// Letakkan file ini di ROOT repo GitHub (sama level dengan index.html)

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAjMvlPZAcXqSzgodW1GxH1prFmoKz316s",
  authDomain: "guild-7972c.firebaseapp.com",
  databaseURL: "https://guild-7972c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "guild-7972c",
  storageBucket: "guild-7972c.firebasestorage.app",
  messagingSenderId: "681701384018",
  appId: "1:681701384018:web:2a7c72a5d766d96be5a48b"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(payload => {
  const data = payload.data || {};
  const title = 'Whattsap: ' + (data.fromName || 'Pesan baru');
  const body  = data.type === 'sticker' ? '🖼️ Stiker' : (data.text || 'Pesan baru');

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'whattsap-' + (data.from || 'msg'),
    renotify: true,
    vibrate: [200, 100, 200],
    data: { chatId: data.chatId, from: data.from }
  });
});

// Tap notif → buka app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if(list.length > 0) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});
