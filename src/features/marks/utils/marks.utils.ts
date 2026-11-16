import type { MarkSheet, ResultStatus, SaveResultsPayload, SheetRow } from '@/core/api/types';
import type { Tone } from '@/core/theme/tones';

/** What the teacher typed for one student. */
export interface MarkEdit { text: string; absent: boolean }
export type MarkEdits = Record<number, MarkEdit>;

/** A mark as typed: empty = no mark yet, else a number in [0, max] with at most two decimals (Arabic comma accepted). */
export function parseMark(text: string, max: number): { value: number | null; valid: boolean } {
  const normalized = text.trim().replace(',', '.');
  if (normalized === '') return { value: null, valid: true };
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return { value: null, valid: false };
  const value = Number(normalized);
  return value <= max ? { value, valid: true } : { value, valid: false };
}

const textOf = (row: SheetRow): string => (row.result?.mark == null ? '' : String(row.result.mark));

/** The edits that mirror the saved sheet (the starting point, and the reference for "unsaved"). */
export function editsFrom(sheet: MarkSheet): MarkEdits {
  return Object.fromEntries(sheet.rows.map((r) => [r.student.id, { text: textOf(r), absent: r.result?.status === 'ABSENT' }]));
}

/** Rows whose typed value differs from what the server has. */
export function changedRows(sheet: MarkSheet, edits: MarkEdits): SheetRow[] {
  return sheet.rows.filter((r) => {
    const e = edits[r.student.id];
    if (!e) return false;
    return e.text.trim() !== textOf(r) || e.absent !== (r.result?.status === 'ABSENT');
  });
}

/** True when any typed mark is out of range or malformed (the save button stays off). */
export function hasInvalid(sheet: MarkSheet, edits: MarkEdits): boolean {
  const max = Number(sheet.exam.maxMark);
  return sheet.rows.some((r) => {
    const e = edits[r.student.id];
    return !!e && !e.absent && !parseMark(e.text, max).valid;
  });
}

/** The payload for the changed rows only: an absent student sends no mark, an empty box clears it. */
export function toPayload(sheet: MarkSheet, edits: MarkEdits): SaveResultsPayload {
  const max = Number(sheet.exam.maxMark);
  return {
    results: changedRows(sheet, edits).map((r) => {
      const e = edits[r.student.id];
      return e.absent ? { studentId: r.student.id, absent: true } : { studentId: r.student.id, mark: parseMark(e.text, max).value };
    }),
  };
}

/** The status a row will have once saved (same rule as the server, shown while typing). */
export function previewStatus(edit: MarkEdit | undefined, pass: number, max: number): ResultStatus {
  if (!edit) return 'PENDING';
  if (edit.absent) return 'ABSENT';
  const { value, valid } = parseMark(edit.text, max);
  if (!valid || value === null) return 'PENDING';
  return value >= pass ? 'PASSED' : 'FAILED';
}

export const STATUS_TONE: Record<ResultStatus, Tone> = { PENDING: 'neutral', PASSED: 'success', FAILED: 'danger', ABSENT: 'info' };
