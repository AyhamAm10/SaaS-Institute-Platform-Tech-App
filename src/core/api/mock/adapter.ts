import { AxiosError, type AxiosAdapter, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { createExam, deleteExam, examTypes, listExams, saveSheet, sheetOf, updateExam } from './exams';
import { teacherMe } from './me';
import { notificationsRoute } from './notifications';
import { overview, sections, timetable } from './study';

type Config = InternalAxiosRequestConfig;
type Body = Record<string, unknown>;

const TOKENS = { accessToken: 'mock-access-TEACHER', refreshToken: 'mock-refresh-TEACHER' };

/** Dev-only fake backend. Demo login: 0933000000 with any password. */
const fail = (config: Config, status: number, message: string) =>
  Promise.reject(
    new AxiosError(message, String(status), config, null, {
      status, statusText: message, headers: {}, config, data: { statusCode: status, message },
    } as AxiosResponse),
  );

const ok = <T>(config: Config, data: T): Promise<AxiosResponse<T>> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data, status: 200, statusText: 'OK', headers: {}, config }), 350),
  );

/** Demo account 0933000001 starts on the default password (12345678) and must change it. */
let forced = false;

function authRoute(url: string, body: Body, config: Config) {
  if (url.endsWith('/auth/login')) {
    const isForced = body.phone === '0933000001';
    if ((body.phone !== '0933000000' && !isForced) || !body.password) return fail(config, 401, 'invalid_credentials');
    forced = isForced;
    return ok(config, { ...TOKENS, user: { id: 1, role: 'TEACHER', mustChangePassword: isForced } });
  }
  if (url.endsWith('/auth/me')) return ok(config, { mustChangePassword: forced });
  if (url.endsWith('/auth/change-password')) {
    if (body.currentPassword !== '12345678') return fail(config, 401, 'current_password_wrong');
    forced = false;
    return ok(config, { ...TOKENS, user: { id: 1, role: 'TEACHER', mustChangePassword: false } });
  }
  if (url.endsWith('/auth/refresh')) {
    return body.refreshToken === TOKENS.refreshToken ? ok(config, TOKENS) : fail(config, 401, 'token_invalid');
  }
  return ok(config, {});
}

/** /exams routes: list, create, update, delete, mark sheet and saving marks. */
function examRoute(method: string, url: string, body: Body, config: Config) {
  const m = url.match(/\/exams(?:\/(\d+))?(\/results)?$/);
  if (!m) return null;
  const id = m[1] ? Number(m[1]) : null;
  if (id === null) return method === 'post' ? ok(config, createExam(body as never)) : ok(config, listExams(config.params ?? {}));
  if (m[2]) return method === 'put' ? ok(config, saveSheet(id, body as never)) : ok(config, sheetOf(id));
  if (method === 'delete') return ok(config, deleteExam(id));
  return ok(config, updateExam(id, body as never));
}

export const mockAdapter: AxiosAdapter = async (config) => {
  const url = config.url ?? '';
  const method = (config.method ?? 'get').toLowerCase();
  const body = (typeof config.data === 'string' ? JSON.parse(config.data) : (config.data ?? {})) as Body;
  if (url.includes('/auth/')) return authRoute(url, body, config);
  if (!String(config.headers?.Authorization ?? '').endsWith('TEACHER')) return fail(config, 401, 'unauthorized');
  if (forced) return fail(config, 403, 'password_change_required');

  if (url.endsWith('/teacher/me')) return ok(config, teacherMe);
  const inbox = notificationsRoute(url, method, body);
  if (inbox !== null) return ok(config, inbox);
  if (url.endsWith('/teacher/overview')) return ok(config, overview());
  if (url.endsWith('/teacher/timetable')) return ok(config, timetable);
  if (url.endsWith('/teacher/sections')) return ok(config, sections);
  if (url.endsWith('/teacher/exam-types')) return ok(config, examTypes);
  return examRoute(method, url, body, config) ?? fail(config, 404, 'not found');
};
