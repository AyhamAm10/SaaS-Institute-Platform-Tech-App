import { isAxiosError } from 'axios';
import { ar } from '@/core/strings/ar';

const KNOWN: Record<string, string> = {
  invalid_credentials: ar.errors.invalidCredentials,
  institute_code_required: ar.errors.instituteCodeRequired,
  token_invalid: ar.errors.sessionExpired,
  account_deactivated: ar.errors.accountDeactivated,
  current_password_wrong: ar.errors.currentPasswordWrong,
  password_same_as_default: ar.errors.passwordSameAsDefault,
};

/**
 * The backend sends the localized TEXT of an error (English by default, Arabic with Accept-Language: ar),
 * never its key. Map the known auth texts back to keys; the literal key is also accepted.
 */
const BACKEND_TEXT: Record<string, string> = {
  'Invalid credentials': 'invalid_credentials',
  'بيانات الاعتماد غير صالحة': 'invalid_credentials',
  'This account exists in more than one institute. Please enter the institute code': 'institute_code_required',
  'هذا الحساب موجود بأكثر من معهد. يرجى إدخال كود المعهد': 'institute_code_required',
  'This account is deactivated. Please contact the institute administration': 'account_deactivated',
  'هذا الحساب معطّل. يرجى التواصل مع إدارة المعهد': 'account_deactivated',
  'The current password is incorrect': 'current_password_wrong',
  'كلمة المرور الحالية غير صحيحة': 'current_password_wrong',
  'Choose a password different from the default one': 'password_same_as_default',
  'اختر كلمة مرور مختلفة عن الافتراضية': 'password_same_as_default',
};

function errorKey(data: unknown): string | null {
  const message = readMessage(data);
  return message ? (BACKEND_TEXT[message] ?? message) : null;
}

export function isInstituteCodeRequired(error: unknown): boolean {
  return isAxiosError(error) && errorKey(error.response?.data) === 'institute_code_required';
}

function readMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const message = (data as { message?: unknown }).message;
  if (typeof message === 'string') return message;
  if (Array.isArray(message) && typeof message[0] === 'string') return message[0];
  return null;
}

const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

/** Arabic message for any thrown value: server Arabic text if present, else a friendly one. */
export function toArabicMessage(error: unknown): string {
  if (!isAxiosError(error)) return ar.errors.generic;
  if (!error.response) return ar.errors.network;
  const status = error.response.status;
  const message = readMessage(error.response.data);
  const key = errorKey(error.response.data);
  if (key && KNOWN[key]) return KNOWN[key];
  if (message && hasArabic(message)) return message;
  if (status === 401) return ar.errors.sessionExpired;
  if (status === 403) return ar.errors.forbidden;
  if (status === 404) return ar.errors.notFound;
  if (status === 429) return ar.errors.tooMany;
  if (status >= 500) return ar.errors.server;
  return ar.errors.generic;
}
