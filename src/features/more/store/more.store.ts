import { createControllerStore, createMirror } from '@/core/mirror';
import type { MoreState } from '../state/more.state';

/** Isolated store of the More tab (core.md section 3). */
export function createMoreStore() {
  return createControllerStore<MoreState>((set) => ({
    logoutOpen: false,
    isSigningOut: false,
    openLogout: () => set({ logoutOpen: true }),
    closeLogout: () => set({ logoutOpen: false }),
    setSigningOut: (isSigningOut) => set({ isSigningOut }),
  }));
}

export const { Context: MoreContext, useMirror: useMoreMirror } = createMirror<MoreState>('More');
