import type { AuthTokens } from '@/core/api/types';
import { kvDelete, kvGet, kvSet } from './kv';

const ACCESS = 'auth.access';
const REFRESH = 'auth.refresh';

let cache: AuthTokens | null = null;

export async function loadTokens(): Promise<AuthTokens | null> {
  const [accessToken, refreshToken] = await Promise.all([kvGet(ACCESS), kvGet(REFRESH)]);
  cache = accessToken && refreshToken ? { accessToken, refreshToken } : null;
  return cache;
}

export function currentTokens(): AuthTokens | null {
  return cache;
}

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  cache = tokens;
  await Promise.all([kvSet(ACCESS, tokens.accessToken), kvSet(REFRESH, tokens.refreshToken)]);
}

export async function clearTokens(): Promise<void> {
  cache = null;
  await Promise.all([kvDelete(ACCESS), kvDelete(REFRESH)]);
}
