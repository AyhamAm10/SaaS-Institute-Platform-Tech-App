import { registerDevice, removeDevice } from '@/core/api/push.api';
import { USE_MOCK } from '@/core/api/config';
import { kvDelete, kvGet, kvSet } from '@/core/storage/kv';
import { ASK_ON_SIGN_IN, getDevicePush, pushPermission, requestPushPermission } from './device';
import type { PushPermission } from './types';

const TOKEN_KEY = 'push.token';

/**
 * Registers this device for the signed-in user when push is allowed. Runs after
 * every sign-in / app start (refreshes the token's last-seen date). Never throws.
 */
export async function syncPushDevice(ask: boolean = ASK_ON_SIGN_IN): Promise<PushPermission> {
  try {
    let permission = await pushPermission();
    if (permission === 'default' && ask) permission = await requestPushPermission();
    if (permission !== 'granted' || USE_MOCK) return permission;
    const device = await getDevicePush();
    if (!device) return permission;
    await registerDevice(device.token, device.platform);
    await kvSet(TOKEN_KEY, device.token);
    return permission;
  } catch {
    return 'unsupported';
  }
}

/** The "enable notifications" button (web needs the click to show the prompt). */
export function enablePush(): Promise<PushPermission> {
  return syncPushDevice(true);
}

/** Sign out: this device stops receiving the previous user's notifications. */
export async function releasePushDevice(): Promise<void> {
  const token = await kvGet(TOKEN_KEY);
  if (!token) return;
  try {
    await removeDevice(token);
  } catch {
    /* the token expires on its own; local sign-out continues */
  }
  await kvDelete(TOKEN_KEY);
}
