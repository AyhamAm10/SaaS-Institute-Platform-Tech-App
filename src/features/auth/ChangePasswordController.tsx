import { useCallback, useState } from 'react';
import { toArabicMessage } from '@/core/api/errors';
import { changePasswordAndContinue, signOut } from '@/core/auth/actions';
import { ChangePasswordContext, createChangePasswordStore } from './store/change-password.store';
import { validateChangePassword } from './utils/change-password.utils';
import { ChangePasswordView } from './ui/ChangePasswordView';

/** The forced first step on the default password; on success the session store flips and the gate leaves this screen. */
export function ChangePasswordController() {
  const [store] = useState(createChangePasswordStore);

  const submit = useCallback(async () => {
    const { form, setErrors, setGeneralError, setSubmitting } = store.getState();
    const errors = validateChangePassword(form);
    if (Object.keys(errors).length > 0) return setErrors(errors);
    setGeneralError(null);
    setSubmitting(true);
    try {
      await changePasswordAndContinue({ currentPassword: form.currentPassword, newPassword: form.newPassword });
    } catch (error: unknown) {
      setGeneralError(toArabicMessage(error));
    } finally {
      setSubmitting(false);
    }
  }, [store]);

  return (
    <ChangePasswordContext.Provider value={store}>
      <ChangePasswordView onSubmit={submit} onSignOut={() => void signOut()} />
    </ChangePasswordContext.Provider>
  );
}
