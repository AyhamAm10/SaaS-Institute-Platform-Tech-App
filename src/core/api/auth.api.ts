import { api, get } from './client';
import type { AccountState, ChangePasswordInput, LoginInput, LoginResponse, TeacherMe } from './types';

export async function login(input: LoginInput): Promise<LoginResponse> {
  const code = input.instituteCode?.trim();
  const body = {
    phone: input.phone.trim(),
    password: input.password,
    ...(code ? { instituteCode: code } : {}),
  };
  const res = await api.post<LoginResponse>('/auth/login', body);
  return res.data;
}

export async function logoutRequest(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch {
    /* local logout proceeds regardless */
  }
}

export const fetchMe = () => get<TeacherMe>('/teacher/me');

/** Works while the password is still the default one (the teacher profile does not). */
export const fetchAccountState = () => get<AccountState>('/auth/me');

/** The forced first step: returns fresh tokens, the old ones are revoked. */
export async function changePassword(input: ChangePasswordInput): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/auth/change-password', input);
  return res.data;
}
