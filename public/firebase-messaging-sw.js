// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDdduzyhHDy0U-8mMKV_JYJn720G08V29o",
    authDomain: "aeroswift-3cd95.firebaseapp.com",
    projectId: "aeroswift-3cd95",
    storageBucket: "aeroswift-3cd95.appspot.com",
    messagingSenderId: "157685447698",
    appId: "1:157685447698:web:9a0e64b2b1fb4e0b3daccb",
    measurementId: "G-ECSE5G039"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});