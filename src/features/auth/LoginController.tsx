import { useCallback, useState } from 'react';
import { signIn } from '@/core/auth/actions';
import { isInstituteCodeRequired, toArabicMessage } from '@/core/api/errors';
import { LoginContext, createLoginStore } from './store/login.store';
import { validateLogin } from './utils/login.utils';
import { LoginView } from './ui/LoginView';

/** Login: validates, signs in, and asks for the institute code only when the server requires it. */
export function LoginController() {
  const [store] = useState(createLoginStore);

  const submit = useCallback(async () => {
    const { form, needsCode, setErrors, setGeneralError, setSubmitting, setNeedsCode } = store.getState();
    const errors = validateLogin(form, needsCode);
    if (Object.keys(errors).length > 0) return setErrors(errors);
    setGeneralError(null);
    setSubmitting(true);
    try {
      // On success the session store flips and the gate leaves this screen.
      await signIn({ phone: form.phone, password: form.password, instituteCode: form.instituteCode });
    } catch (error: unknown) {
      if (isInstituteCodeRequired(error)) setNeedsCode(true);
      else setGeneralError(toArabicMessage(error));
    } finally {
      setSubmitting(false);
    }
  }, [store]);

  return (
    <LoginContext.Provider value={store}>
      <LoginView onSubmit={submit} />
    </LoginContext.Provider>
  );
}
