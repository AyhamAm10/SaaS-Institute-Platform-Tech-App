/** Server notification types (GET /notifications). */
export type ServerNotificationType =
  | 'ATTENDANCE_ARRIVAL' | 'ATTENDANCE_LATE' | 'ATTENDANCE_ABSENT' | 'ATTENDANCE_EARLY_EXIT' | 'ATTENDANCE_EXCUSED'
  | 'PAYMENT_RECEIVED' | 'INSTALLMENT_DUE' | 'INSTALLMENT_OVERDUE'
  | 'EXAM_SCHEDULED' | 'EXAM_RESULT' | 'TIMETABLE_CHANGED'
  | 'STUDENT_NOTE' | 'CLOSURE'
  | 'TEACHER_ASSIGNED' | 'TEACHER_EXAM_CREATED' | 'MARKS_REMINDER';

/** One row of the signed-in user's inbox. */
export interface ServerNotification {
  id: number;
  type: ServerNotificationType;
  title: string;
  body: string;
  /** `path` is the app screen to open; ids are extra context. */
  data: { path?: string; studentId?: number } & Record<string, unknown>;
  studentId: number | null;
  read: boolean;
  /** ISO instant. */
  createdAt: string;
}

export interface NotificationsPage {
  data: ServerNotification[];
  total: number;
  unread: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type NotificationCategory = 'ATTENDANCE' | 'FINANCE' | 'STUDY' | 'NOTES' | 'GENERAL';

export interface NotificationSettings {
  categories: { key: NotificationCategory; enabled: boolean }[];
}

export type PushPlatform = 'ANDROID' | 'IOS' | 'WEB';
