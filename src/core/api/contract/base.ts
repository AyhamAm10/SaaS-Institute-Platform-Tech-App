/** API contract of the teacher module (/teacher/*). Dates YYYY-MM-DD, times HH:mm. Mirrors backend teacher-api.types. */
export type Weekday =
  | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginInput {
  phone: string;
  password: string;
  instituteCode?: string;
}

export interface LoginResponse extends AuthTokens {
  /** `mustChangePassword`: still on the default password, only the change-password call works. */
  user: { id: number; role: string; mustChangePassword?: boolean };
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

/** The part of GET /auth/me the app needs before the teacher profile can be read. */
export interface AccountState {
  mustChangePassword: boolean;
}

export interface BreakSlot { name: string; startTime: string; endTime: string }

export interface TeacherMe {
  teacher: { id: number; fullName: string; phone: string; specialization: string | null };
  institute: { id: number; timezone: string };
  /** Branches of the teacher. Send a section's own branch as X-Branch-Id when acting on it. */
  branches: { id: number; name: string }[];
  academicYear: { id: number; name: string; startDate: string; endDate: string } | null;
  schedule: {
    workingDays: number[];
    dayStartTime: string;
    dayEndTime: string;
    periodDurationMinutes: number;
    lateAfterMinutes: number;
    breaks: BreakSlot[];
  };
  availability: { dayOfWeek: number; startTime: string; endTime: string }[];
}
