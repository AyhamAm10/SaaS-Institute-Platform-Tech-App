/**
 * Firebase web settings of the institute project. These values are public by
 * design (every web client receives them); access is controlled by Firebase.
 */
export const FIREBASE_WEB_CONFIG = {
  apiKey: 'AIzaSyDdPM323_6aNj_x4KQwU4y2BphqEjLAjaI',
  authDomain: 'jil-salam-institute.firebaseapp.com',
  projectId: 'jil-salam-institute',
  storageBucket: 'jil-salam-institute.firebasestorage.app',
  messagingSenderId: '36368609957',
  appId: '1:36368609957:web:365b7041cc0b73caa6934c',
};

/** Web push public key (Firebase Cloud Messaging, web configuration). */
export const VAPID_KEY =
  'BKr0iSYI2YQHYps4RRBrj3RJUOvOpoVHHZsBtC3_UADXTtv4xCg5T70GZ3PgVCfyryE4WqW4NZQn1T0AL8T-9jE';

/** Folder the web build is served from (`/teacher` on the server, empty in development). */
export const WEB_BASE_URL = (process.env.EXPO_PUBLIC_WEB_BASE_URL ?? '').replace(/\/+$/, '');
