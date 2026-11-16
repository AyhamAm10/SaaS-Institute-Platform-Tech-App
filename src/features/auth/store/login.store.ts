import { createControllerStore, createMirror } from '@/core/mirror';
import type { LoginState } from '../state/login.state';
import { EMPTY_LOGIN } from '../utils/login.utils';

/** Isolated store of the login screen (core.md section 3). */
export function createLoginStore() {
  return createControllerStore<LoginState>((set) => ({
    form: EMPTY_LOGIN,
    errors: {},
    needsCode: false,
    generalError: null,
    isSubmitting: false,

    // '' clears a field error; the general error goes away as soon as the user edits
    setField: (key, value) =>
      set((s) => ({ form: { ...s.form, [key]: value }, errors: { ...s.errors, [key]: '' }, generalError: null })),
    setErrors: (errors) => set({ errors }),
    setNeedsCode: (needsCode) => set({ needsCode }),
    setGeneralError: (generalError) => set({ generalError }),
    setSubmitting: (isSubmitting) => set({ isSubmitting }),
  }));
}

export const { Context: LoginContext, useMirror: useLoginMirror } = createMirror<LoginState>('Login');
