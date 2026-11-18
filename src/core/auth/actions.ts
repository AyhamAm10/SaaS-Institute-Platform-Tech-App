import { changePassword, fetchAccountState, fetchMe, login, logoutRequest } from '@/core/api/auth.api';
import { setAuthFailureHandler } from '@/core/api/client';
import type { ChangePasswordInput, LoginInput } from '@/core/api/types';
import { queryClient } from '@/core/api/query-client';
import { releasePushDevice, syncPushDevice } from '@/core/push/registration';
import { clearTokens, loadTokens, saveTokens } from '@/core/storage/tokens';
import { useSession } from './store';

async function loadProfile(): Promise<void> {
  useSession.getState().setSignedIn(await fetchMe());
  // Push is best effort: registers this device in the background
  void syncPushDevice();
}

/** App start: restore a stored session (splash is shown while status === 'restoring'). */
export async function restoreSession(): Promise<void> {
  setAuthFailureHandler(() => {
    queryClient.clear();
    useSession.getState().setSignedOut();
  });
  const tokens = await loadTokens();
  if (!tokens) {
    useSession.getState().setSignedOut();
    return;
  }
  try {
    // A default-password account cannot read the teacher profile yet
    if ((await fetchAccountState()).mustChangePassword) {
      useSession.getState().setMustChangePassword();
      return;
    }
    await loadProfile();
  } catch {
    // 401 already handled by the interceptor (refresh once, then logout); other errors: stay signed out.
    if (useSession.getState().status !== 'signedIn') useSession.getState().setSignedOut();
  }
}

/** Throws the axios error on failure so the login form can show a message. */
export async function signIn(input: LoginInput): Promise<void> {
  const res = await login(input);
  await saveTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
  if (res.user.mustChangePassword) {
    useSession.getState().setMustChangePassword();
    return;
  }
  try {
    await loadProfile();
  } catch (error) {
    // Not a teacher (403 on /teacher/me) or the profile failed: never keep the tokens.
    await clearTokens();
    throw error;
  }
}

/** The forced first step: new tokens are stored and the app continues as a normal session. */
export async function changePasswordAndContinue(input: ChangePasswordInput): Promise<void> {
  const res = await changePassword(input);
  await saveTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
  try {
    await loadProfile();
  } catch (error) {
    await clearTokens();
    throw error;
  }
}

export async function signOut(): Promise<void> {
  await releasePushDevice();
  await logoutRequest();
  await clearTokens();
  queryClient.clear();
  useSession.getState().setSignedOut();
}
