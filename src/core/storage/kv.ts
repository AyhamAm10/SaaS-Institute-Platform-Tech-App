import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Key-value storage. Native: expo-secure-store (Keychain/Keystore).
 * Web has no secure store: the installed web app (iPhone users, home screen)
 * keeps the session in localStorage of its own origin.
 */
export async function kvGet(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') return globalThis.localStorage?.getItem(key) ?? null;
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

export async function kvSet(key: string, value: string): Promise<void> {
  try {
    if (Platform.OS === 'web') globalThis.localStorage?.setItem(key, value);
    else await SecureStore.setItemAsync(key, value);
  } catch {
    /* storage unavailable: session simply will not persist */
  }
}

export async function kvDelete(key: string): Promise<void> {
  try {
    if (Platform.OS === 'web') globalThis.localStorage?.removeItem(key);
    else await SecureStore.deleteItemAsync(key);
  } catch {
    /* nothing to clean */
  }
}
