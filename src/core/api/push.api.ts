import { api } from './client';
import type { PushPlatform } from './types';

/** Which app the device belongs to (the backend builds web links per app). */
export const PUSH_APP = 'TEACHER';

/** Saves (or refreshes) this device's push token for the signed-in user. */
export async function registerDevice(token: string, platform: PushPlatform): Promise<void> {
  await api.post('/notifications/devices', { token, platform, app: PUSH_APP });
}

/** Stops pushes to this device (sign out). */
export async function removeDevice(token: string): Promise<void> {
  await api.delete('/notifications/devices', { data: { token } });
}
