import type { AuthTokens } from './types';

export interface RefreshDeps {
  getTokens: () => AuthTokens | null;
  requestRefresh: (refreshToken: string) => Promise<AuthTokens>;
  saveTokens: (tokens: AuthTokens) => Promise<void>;
  onFailure: () => void | Promise<void>;
}

/**
 * Builds a single-flight refresher: concurrent 401s share ONE refresh call
 * (the refresh token rotates, so two parallel calls would invalidate each other).
 * Resolves with the new access token, or null after calling onFailure.
 */
export function createRefresher(deps: RefreshDeps): () => Promise<string | null> {
  let inFlight: Promise<string | null> | null = null;

  const run = async (): Promise<string | null> => {
    const current = deps.getTokens();
    if (!current) {
      await deps.onFailure();
      return null;
    }
    try {
      const next = await deps.requestRefresh(current.refreshToken);
      await deps.saveTokens(next);
      return next.accessToken;
    } catch {
      await deps.onFailure();
      return null;
    }
  };

  return () => {
    if (!inFlight) {
      inFlight = run().finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  };
}
