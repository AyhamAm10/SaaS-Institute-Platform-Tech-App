/** Mock mode is dev-only: __DEV__ is false in production bundles, so it can never turn on there. */
export const USE_MOCK: boolean = __DEV__ && process.env.EXPO_PUBLIC_USE_MOCK === '1';

const rawUrl = process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:4000';
const normalized = rawUrl.replace(/\/+$/, '');
export const API_BASE_URL = normalized.endsWith('/api') ? normalized : `${normalized}/api`;
