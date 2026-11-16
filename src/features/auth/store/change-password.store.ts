import { createControllerStore, createMirror } from '@/core/mirror';
import type { ChangePasswordState } from '../state/change-password.state';
import { EMPTY_CHANGE_PASSWORD } from '../utils/change-password.utils';

/** Isolated store of the forced password change screen (core.md section 3). */
export function createChangePasswordStore() {
  return createControllerStore<ChangePasswordState>((set) => ({
    form: EMPTY_CHANGE_PASSWORD,
    errors: {},
    generalError: null,
    isSubmitting: false,

    // '' clears a field error; the general error goes away as soon as the user edits
    setField: (key, value) =>
      set((s) => ({ form: { ...s.form, [key]: value }, errors: { ...s.errors, [key]: '' }, generalError: null })),
    setErrors: (errors) => set({ errors }),
    setGeneralError: (generalError) => set({ generalError }),
    setSubmitting: (isSubmitting) => set({ isSubmitting }),
  }));
}

export const { Context: ChangePasswordContext, useMirror: useChangePasswordMirror } =
  createMirror<ChangePasswordState>('ChangePassword');
