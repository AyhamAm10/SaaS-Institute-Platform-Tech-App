import { ar } from '@/core/strings/ar';

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordErrors = Partial<Record<keyof ChangePasswordForm, string>>;

export const EMPTY_CHANGE_PASSWORD: ChangePasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

/** The password every new or reset account starts with: never accepted as the new one. */
export const DEFAULT_PASSWORD = '12345678';
export const PASSWORD_MIN = 8;

/** Field errors of the forced password change; empty object = valid. */
export function validateChangePassword(form: ChangePasswordForm): ChangePasswordErrors {
  const errors: ChangePasswordErrors = {};
  if (!form.currentPassword) errors.currentPassword = ar.auth.currentRequired;
  if (form.newPassword.length < PASSWORD_MIN) errors.newPassword = ar.auth.passwordShort;
  else if (form.newPassword === DEFAULT_PASSWORD) errors.newPassword = ar.auth.passwordIsDefault;
  if (form.confirmPassword !== form.newPassword) errors.confirmPassword = ar.auth.passwordMismatch;
  return errors;
}
