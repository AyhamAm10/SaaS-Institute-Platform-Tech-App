import { ar } from '@/core/strings/ar';
import { toArabicMessage } from '@/core/api/errors';
import { DEFAULT_PASSWORD, EMPTY_CHANGE_PASSWORD, validateChangePassword } from '@/features/auth/utils/change-password.utils';
import { createChangePasswordStore } from '@/features/auth/store/change-password.store';

const form = (over = {}) => ({ ...EMPTY_CHANGE_PASSWORD, currentPassword: DEFAULT_PASSWORD, newPassword: 'new-password-1', confirmPassword: 'new-password-1', ...over });

describe('forced password change', () => {
  it('accepts a valid new password', () => {
    expect(validateChangePassword(form())).toEqual({});
  });
  it('asks for the current password, a long enough new one and a matching confirmation', () => {
    expect(Object.keys(validateChangePassword(EMPTY_CHANGE_PASSWORD)).sort()).toEqual(['currentPassword', 'newPassword']);
    expect(validateChangePassword(form({ newPassword: 'short', confirmPassword: 'short' })).newPassword).toBe(ar.auth.passwordShort);
    expect(validateChangePassword(form({ confirmPassword: 'other-password' })).confirmPassword).toBe(ar.auth.passwordMismatch);
  });
  it('refuses the default password as the new one', () => {
    expect(validateChangePassword(form({ newPassword: DEFAULT_PASSWORD, confirmPassword: DEFAULT_PASSWORD })).newPassword).toBe(
      ar.auth.passwordIsDefault,
    );
  });
  it('clears a field error and the general error when the user types again', () => {
    const store = createChangePasswordStore();
    store.getState().setErrors({ newPassword: 'x' });
    store.getState().setGeneralError('y');
    store.getState().setField('newPassword', 'abc');
    expect(store.getState().errors.newPassword).toBe('');
    expect(store.getState().generalError).toBeNull();
  });
  it('maps the backend texts of the change-password errors', () => {
    const wrong = { isAxiosError: true, response: { status: 401, data: { message: 'The current password is incorrect' } } };
    expect(toArabicMessage(wrong)).toBe(ar.errors.currentPasswordWrong);
  });
});
