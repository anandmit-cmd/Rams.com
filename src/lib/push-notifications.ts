
'use client';

import { messaging, db } from '@/lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const initializeFCM = async (user: User) => {
    if (typeof window === 'undefined' || !messaging) {
        console.log("Firebase Messaging is not supported in this browser or environment.");
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');

            const fcmToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_HERE' }); // IMPORTANT: Replace with your actual VAPID key from Firebase Console

            if (fcmToken) {
                console.log('FCM Token:', fcmToken);
                // Save the token to Firestore
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, { fcmToken: fcmToken }, { merge: true });

            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        } else {
            console.log('Unable to get permission to notify.');
        }
    } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
    }

    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // Customize notification here
        const notificationTitle = payload.notification?.title || 'New Notification';
        const notificationOptions = {
            body: payload.notification?.body || '',
            icon: payload.notification?.icon || '/favicon.ico',
        };

        new Notification(notificationTitle, notificationOptions);
    });
};

// NOTE: You need to create a `firebase-messaging-sw.js` file in your `public` directory.
// The content of the file should be:
/*
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
*/
// Replace the placeholder values with your actual Firebase config.
