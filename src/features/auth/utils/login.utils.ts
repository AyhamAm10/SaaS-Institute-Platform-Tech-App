import { ar } from '@/core/strings/ar';

export interface LoginForm {
  phone: string;
  password: string;
  instituteCode: string;
}

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;

export const EMPTY_LOGIN: LoginForm = { phone: '', password: '', instituteCode: '' };

/** Local phone numbers: digits only, 8 to 15 (a leading + is allowed). */
const PHONE = /^\+?\d{8,15}$/;

/** Field errors of the login form; empty object = valid. The code is required only when asked for. */
export function validateLogin(form: LoginForm, needsCode: boolean): LoginErrors {
  const errors: LoginErrors = {};
  const phone = form.phone.trim();
  if (!phone) errors.phone = ar.auth.phoneRequired;
  else if (!PHONE.test(phone)) errors.phone = ar.auth.phoneInvalid;
  if (!form.password) errors.password = ar.auth.passwordRequired;
  if (needsCode && !form.instituteCode.trim()) errors.instituteCode = ar.auth.codeRequired;
  return errors;
}
