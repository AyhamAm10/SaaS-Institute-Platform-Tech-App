import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { ar } from '@/core/strings/ar';
import type { DevicePush, PushHandlers, PushPermission, PushTap } from './types';

/** Native apps ask for permission right after sign-in (the Android 13+ system prompt). */
export const ASK_ON_SIGN_IN = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const toPermission = (status: string): PushPermission =>
  status === 'granted' ? 'granted' : status === 'denied' ? 'denied' : 'default';

/** Expo Go cannot receive remote push (Expo limitation): only a real build or the web app can. */
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export async function pushPermission(): Promise<PushPermission> {
  if (isExpoGo) return 'expoGo';
  try {
    return toPermission((await Notifications.getPermissionsAsync()).status);
  } catch {
    return 'unsupported';
  }
}

export async function requestPushPermission(): Promise<PushPermission> {
  if (isExpoGo) return 'expoGo';
  try {
    return toPermission((await Notifications.requestPermissionsAsync()).status);
  } catch {
    return 'unsupported';
  }
}

/** The FCM token of this device (null in Expo Go or without permission). */
export async function getDevicePush(): Promise<DevicePush | null> {
  if ((await pushPermission()) !== 'granted') return null;
  try {
    if (Platform.OS === 'android') {
      // The backend sends to channel "default" with high priority (heads-up banner)
      await Notifications.setNotificationChannelAsync('default', {
        name: ar.notifications.channel,
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    const token = await Notifications.getDevicePushTokenAsync();
    return { platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID', token: String(token.data) };
  } catch {
    return null;
  }
}

const str = (v: unknown) => (v === undefined || v === null ? undefined : String(v));
const tapOf = (data: Record<string, unknown> | undefined): PushTap => ({
  path: str(data?.path),
  examId: str(data?.examId),
  sectionId: str(data?.sectionId),
});

/** Foreground pushes refresh the inbox; taps (also the one that launched the app) open their screen. */
export function listenPush({ onReceive, onTap }: PushHandlers): () => void {
  const received = Notifications.addNotificationReceivedListener(() => onReceive());
  const tapped = Notifications.addNotificationResponseReceivedListener((r) =>
    onTap(tapOf(r.notification.request.content.data)),
  );
  void Notifications.getLastNotificationResponseAsync().then((r) => {
    if (r) {
      onTap(tapOf(r.notification.request.content.data));
      void Notifications.clearLastNotificationResponseAsync?.();
    }
  });
  return () => {
    received.remove();
    tapped.remove();
  };
}
