import type { ChangePasswordErrors, ChangePasswordForm } from '../utils/change-password.utils';

/** Forced password change: the fields, their errors and the submit flag. */
export interface ChangePasswordState {
  form: ChangePasswordForm;
  errors: ChangePasswordErrors;
  generalError: string | null;
  isSubmitting: boolean;

  setField: <K extends keyof ChangePasswordForm>(key: K, value: ChangePasswordForm[K]) => void;
  setErrors: (errors: ChangePasswordErrors) => void;
  setGeneralError: (error: string | null) => void;
  setSubmitting: (value: boolean) => void;
}
