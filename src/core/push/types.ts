import type { PushPlatform } from '@/core/api/types';

/**
 * Where push stands on this device:
 * - `needsInstall`: iPhone/iPad browser; web push works only from the app added to the home screen.
 * - `unsupported`: the browser has no web push (or the native build has no push service).
 * - `expoGo`: running inside Expo Go, which cannot receive remote push.
 */
export type PushPermission = 'granted' | 'denied' | 'default' | 'needsInstall' | 'unsupported' | 'expoGo';

export interface DevicePush {
  platform: PushPlatform;
  token: string;
}

/** What a tapped push carries: the screen and, for exam notices, the exam and its section. */
export interface PushTap {
  path?: string;
  examId?: string;
  sectionId?: string;
}

/** Callbacks of the platform listener (foreground message, tap on a notification). */
export interface PushHandlers {
  onReceive: () => void;
  onTap: (tap: PushTap) => void;
}
