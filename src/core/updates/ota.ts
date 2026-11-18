import { AppState } from 'react-native';
import * as Updates from 'expo-updates';

let busy = false;

/**
 * Over-the-air updates (EAS Update): if the server has a newer JS/design update for this build's runtime,
 * download it and restart into it at once. Release builds only (dev and web have no updates). Never throws:
 * offline or a server error simply keeps the current version.
 */
export async function applyPendingUpdate(): Promise<void> {
  if (__DEV__ || !Updates.isEnabled || busy) return;
  busy = true;
  try {
    const check = await Updates.checkForUpdateAsync();
    if (!check.isAvailable) return;
    const fetched = await Updates.fetchUpdateAsync();
    if (fetched.isNew) await Updates.reloadAsync();
  } catch {
    // Keep the running version; the next start or foreground tries again.
  } finally {
    busy = false;
  }
}

/** Checks at start and every time the app comes back to the foreground. Returns the unsubscribe. */
export function watchForUpdates(): () => void {
  void applyPendingUpdate();
  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'active') void applyPendingUpdate();
  });
  return () => sub.remove();
}
