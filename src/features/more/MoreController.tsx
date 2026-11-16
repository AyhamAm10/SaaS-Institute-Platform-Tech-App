import { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { signOut } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { useSchemePreference } from '@/core/theme/preference';
import { MoreContext, createMoreStore } from './store/more.store';
import { MoreView } from './ui/MoreView';

/** More: the teacher's profile, appearance choice, notifications entry and logout with a confirmation. */
export function MoreController() {
  const [store] = useState(createMoreStore);
  const router = useRouter();
  const me = useSession((s) => s.me);
  const preference = useSchemePreference((s) => s.preference);
  const setPreference = useSchemePreference((s) => s.setPreference);

  const confirmLogout = useCallback(async () => {
    store.getState().setSigningOut(true);
    try {
      await signOut();
    } finally {
      store.getState().setSigningOut(false);
      store.getState().closeLogout();
    }
  }, [store]);

  return (
    <MoreContext.Provider value={store}>
      <MoreView
        me={me}
        version={Constants.expoConfig?.version ?? '1.0.0'}
        preference={preference}
        onPreference={setPreference}
        onNotifications={() => router.push('/notifications')}
        onConfirmLogout={confirmLogout}
      />
    </MoreContext.Provider>
  );
}
