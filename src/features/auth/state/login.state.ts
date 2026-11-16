import type { LoginErrors, LoginForm } from '../utils/login.utils';

/** Login form state: the fields, their errors, the optional institute code and the submit flag. */
export interface LoginState {
  form: LoginForm;
  errors: LoginErrors;
  /** The server asked for the institute code (the phone exists in several institutes). */
  needsCode: boolean;
  generalError: string | null;
  isSubmitting: boolean;

  setField: <K extends keyof LoginForm>(key: K, value: LoginForm[K]) => void;
  setErrors: (errors: LoginErrors) => void;
  setNeedsCode: (needsCode: boolean) => void;
  setGeneralError: (error: string | null) => void;
  setSubmitting: (value: boolean) => void;
}
