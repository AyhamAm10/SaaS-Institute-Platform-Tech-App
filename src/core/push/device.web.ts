import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { FIREBASE_WEB_CONFIG, VAPID_KEY, WEB_BASE_URL } from './config';
import type { DevicePush, PushHandlers, PushPermission } from './types';

/** Browsers block a permission prompt that is not a click: web asks from a button only. */
export const ASK_ON_SIGN_IN = false;

const isAppleMobile = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);

const isInstalled = () =>
  globalThis.matchMedia?.('(display-mode: standalone)').matches === true ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export async function pushPermission(): Promise<PushPermission> {
  if (typeof window === 'undefined') return 'unsupported';
  if (isAppleMobile() && !isInstalled()) return 'needsInstall';
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator)) return 'unsupported';
  if (!(await isSupported().catch(() => false))) return 'unsupported';
  return Notification.permission;
}

export async function requestPushPermission(): Promise<PushPermission> {
  const current = await pushPermission();
  if (current !== 'default') return current;
  return Notification.requestPermission();
}

/** The service worker that shows pushes while the app is closed (scoped to this app's folder). */
const registration = () =>
  navigator.serviceWorker.register(`${WEB_BASE_URL}/firebase-messaging-sw.js`, { scope: `${WEB_BASE_URL}/` });

const messaging = () => getMessaging(getApps()[0] ?? initializeApp(FIREBASE_WEB_CONFIG));

export async function getDevicePush(): Promise<DevicePush | null> {
  if ((await pushPermission()) !== 'granted') return null;
  try {
    const token = await getToken(messaging(), { vapidKey: VAPID_KEY, serviceWorkerRegistration: await registration() });
    return token ? { platform: 'WEB', token } : null;
  } catch {
    return null;
  }
}

/**
 * A push that arrives while the app is open is not shown by the browser:
 * show it through the service worker (its click opens the screen) and refresh the inbox.
 */
export function listenPush({ onReceive }: PushHandlers): () => void {
  let stop: () => void = () => undefined;
  void pushPermission().then(async (p) => {
    if (p !== 'granted') return;
    const reg = await registration();
    stop = onMessage(messaging(), (payload) => {
      onReceive();
      const title = payload.notification?.title;
      if (!title) return;
      void reg.showNotification(title, {
        body: payload.notification?.body,
        icon: `${WEB_BASE_URL}/icon-192.png`,
        dir: 'rtl',
        lang: 'ar',
        data: { link: payload.fcmOptions?.link ?? `${WEB_BASE_URL}/notifications` },
      });
    });
  });
  return () => stop();
}
