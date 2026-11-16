import { create, isAxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, USE_MOCK } from './config';
import { mockAdapter } from './mock/adapter';
import { createRefresher } from './refresh';
import type { AuthTokens } from './types';
import { clearTokens, currentTokens, saveTokens } from '@/core/storage/tokens';

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { 'X-Client-Type': 'mobile' },
  ...(USE_MOCK ? { adapter: mockAdapter } : {}),
});

type Retriable = InternalAxiosRequestConfig & { _retried?: boolean };

let onAuthFailure: () => void = () => undefined;
/** The session store registers what happens when refresh fails (logout). */
export function setAuthFailureHandler(handler: () => void): void {
  onAuthFailure = handler;
}

const isAuthUrl = (url?: string) => !!url && /\/auth\/(login|refresh)/.test(url);

const refreshAccessToken = createRefresher({
  getTokens: currentTokens,
  requestRefresh: async (refreshToken) => {
    const res = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    return { accessToken: res.data.accessToken, refreshToken: res.data.refreshToken };
  },
  saveTokens,
  onFailure: async () => {
    await clearTokens();
    onAuthFailure();
  },
});

api.interceptors.request.use((config) => {
  const tokens = currentTokens();
  if (tokens && !isAuthUrl(config.url)) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  config.headers['Accept-Language'] = 'ar'; // the backend localizes error messages from this header
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.config) throw error;
    const config = error.config as Retriable;
    if (error.response?.status !== 401 || config._retried || isAuthUrl(config.url)) throw error;
    config._retried = true;
    const token = await refreshAccessToken();
    if (!token) throw error;
    config.headers.Authorization = `Bearer ${token}`;
    return api(config as AxiosRequestConfig);
  },
);

/**
 * Operational context of a request. The server scopes exams by the header year / branch: send the
 * section's OWN branch and year when acting on it (both come with GET /teacher/sections).
 */
export interface RequestScope { branchId?: number; academicYearId?: number }

const scopeHeaders = (scope?: RequestScope) => ({
  ...(scope?.branchId ? { 'X-Branch-Id': String(scope.branchId) } : {}),
  ...(scope?.academicYearId ? { 'X-Academic-Year-Id': String(scope.academicYearId) } : {}),
});

type Params = Record<string, string | number | undefined>;

export async function get<T>(url: string, params?: Params, scope?: RequestScope): Promise<T> {
  const res = await api.get<T>(url, { params, headers: scopeHeaders(scope) });
  return res.data;
}

export async function post<T>(url: string, body: unknown, scope?: RequestScope): Promise<T> {
  const res = await api.post<T>(url, body, { headers: scopeHeaders(scope) });
  return res.data;
}

export async function patch<T>(url: string, body: unknown, scope?: RequestScope): Promise<T> {
  const res = await api.patch<T>(url, body, { headers: scopeHeaders(scope) });
  return res.data;
}

export async function put<T>(url: string, body: unknown, scope?: RequestScope): Promise<T> {
  const res = await api.put<T>(url, body, { headers: scopeHeaders(scope) });
  return res.data;
}

export async function remove<T>(url: string, params?: Params, scope?: RequestScope): Promise<T> {
  const res = await api.delete<T>(url, { params, headers: scopeHeaders(scope) });
  return res.data;
}
