import { create } from 'zustand';
import { kvGet, kvSet } from '@/core/storage/kv';

export type SchemePreference = 'system' | 'light' | 'dark';

const KEY = 'pref.scheme';
const isPreference = (v: string | null): v is SchemePreference => v === 'system' || v === 'light' || v === 'dark';

interface PreferenceState {
  preference: SchemePreference;
  setPreference: (value: SchemePreference) => void;
  hydrate: () => Promise<void>;
}

/** The user's appearance choice: follow the system, or force light / dark. Persisted on the device. */
export const useSchemePreference = create<PreferenceState>((set) => ({
  preference: 'system',
  setPreference: (value) => {
    set({ preference: value });
    void kvSet(KEY, value);
  },
  hydrate: async () => {
    const stored = await kvGet(KEY);
    if (isPreference(stored)) set({ preference: stored });
  },
}));
