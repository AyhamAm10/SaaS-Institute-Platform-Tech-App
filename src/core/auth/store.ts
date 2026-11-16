import { create } from 'zustand';
import type { TeacherMe } from '@/core/api/types';

/** `mustChangePassword`: signed in with the default password, the app shows only the change-password screen. */
export type SessionStatus = 'restoring' | 'signedOut' | 'mustChangePassword' | 'signedIn';

interface SessionState {
  status: SessionStatus;
  me: TeacherMe | null;
  setSignedIn: (me: TeacherMe) => void;
  setSignedOut: () => void;
  setMustChangePassword: () => void;
}

/** The session: one of the few global stores allowed (core.md section 3). */
export const useSession = create<SessionState>((set) => ({
  status: 'restoring',
  me: null,
  setSignedIn: (me) => set({ status: 'signedIn', me }),
  setSignedOut: () => set({ status: 'signedOut', me: null }),
  setMustChangePassword: () => set({ status: 'mustChangePassword', me: null }),
}));
