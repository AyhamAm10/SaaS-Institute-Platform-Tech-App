import { AxiosError, type AxiosResponse } from 'axios';
import { isInstituteCodeRequired, toArabicMessage } from '@/core/api/errors';
import { ar } from '@/core/strings/ar';

/** The real backend answers with the localized TEXT of the error, not its key. */
function httpError(status: number, message: string): AxiosError {
  const response = { status, data: { statusCode: status, message } } as AxiosResponse;
  return new AxiosError(message, undefined, undefined, undefined, response);
}

describe('backend error texts', () => {
  it('maps the English and Arabic "invalid credentials" texts to the friendly message', () => {
    expect(toArabicMessage(httpError(401, 'Invalid credentials'))).toBe(ar.errors.invalidCredentials);
    expect(toArabicMessage(httpError(401, 'بيانات الاعتماد غير صالحة'))).toBe(ar.errors.invalidCredentials);
  });

  it('detects the institute-code requirement from either language', () => {
    expect(isInstituteCodeRequired(httpError(400, 'This account exists in more than one institute. Please enter the institute code'))).toBe(true);
    expect(isInstituteCodeRequired(httpError(400, 'هذا الحساب موجود بأكثر من معهد. يرجى إدخال كود المعهد'))).toBe(true);
    expect(isInstituteCodeRequired(httpError(401, 'Invalid credentials'))).toBe(false);
  });

  it('still accepts the literal keys', () => {
    expect(isInstituteCodeRequired(httpError(400, 'institute_code_required'))).toBe(true);
  });
});
