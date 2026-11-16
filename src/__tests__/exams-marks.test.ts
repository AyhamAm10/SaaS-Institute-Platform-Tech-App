import { monthCells, shiftMonth, weekHeader, ymOf } from '@/core/format/calendar';
import type { MarkSheet } from '@/core/api/types';
import { examFormFrom, EMPTY_EXAM_FORM, parsePositive, toCreatePayload, toUpdatePayload, validateExamForm } from '@/features/exams/utils/exam-form.utils';
import { subjectOptions } from '@/features/exams/utils/exam-days';
import { changedRows, editsFrom, hasInvalid, parseMark, previewStatus, toPayload } from '@/features/marks/utils/marks.utils';
import { createExamsStore } from '@/features/exams/store/exams.store';
import { createMarksStore } from '@/features/marks/store/marks.store';
import { ar } from '@/core/strings/ar';
import { sheetOf, saveSheet, statusOf } from '@/core/api/mock/exams';

describe('parseMark', () => {
  it('accepts empty, in-range numbers and the Arabic decimal comma', () => {
    expect(parseMark('', 100)).toEqual({ value: null, valid: true });
    expect(parseMark('87.5', 100)).toEqual({ value: 87.5, valid: true });
    expect(parseMark('87,5', 100)).toEqual({ value: 87.5, valid: true });
    expect(parseMark('0', 100)).toEqual({ value: 0, valid: true });
  });
  it('rejects out-of-range, malformed and over-precise values', () => {
    expect(parseMark('101', 100).valid).toBe(false);
    expect(parseMark('-5', 100).valid).toBe(false);
    expect(parseMark('12a', 100).valid).toBe(false);
    expect(parseMark('12.345', 100).valid).toBe(false);
  });
});

describe('marks edits against the saved sheet', () => {
  const sheet = (): MarkSheet => sheetOf(18);
  it('starts from the saved marks and sees no change', () => {
    const s = sheet();
    expect(changedRows(s, editsFrom(s))).toHaveLength(0);
  });
  it('detects typed changes and sends only the changed rows', () => {
    const s = sheet();
    const edits = editsFrom(s);
    edits[6] = { text: '70', absent: false }; // no mark yet -> 70
    edits[1] = { text: '', absent: true }; // marked absent
    const payload = toPayload(s, edits);
    expect(payload.results).toEqual([{ studentId: 1, absent: true }, { studentId: 6, mark: 70 }]);
  });
  it('blocks saving while any typed mark is invalid', () => {
    const s = sheet();
    const edits = editsFrom(s);
    edits[7] = { text: '150', absent: false };
    expect(hasInvalid(s, edits)).toBe(true);
    edits[7] = { text: '50', absent: false };
    expect(hasInvalid(s, edits)).toBe(false);
  });
  it('previews the status with the same rule as the server', () => {
    expect(previewStatus({ text: '49', absent: false }, 50, 100)).toBe('FAILED');
    expect(previewStatus({ text: '50', absent: false }, 50, 100)).toBe('PASSED');
    expect(previewStatus({ text: '', absent: false }, 50, 100)).toBe('PENDING');
    expect(previewStatus({ text: '90', absent: true }, 50, 100)).toBe('ABSENT');
    expect(previewStatus({ text: '999', absent: false }, 50, 100)).toBe('PENDING');
  });
  it('agrees with the mock server after a save (statuses and statistics come back)', () => {
    const saved = saveSheet(18, { results: [{ studentId: 8, mark: 30 }, { studentId: 7, absent: true }] });
    expect(statusOf({ mark: 30, absent: false }, 50)).toBe('FAILED');
    expect(saved.stats.failed).toBeGreaterThanOrEqual(1);
    expect(saved.stats.absent).toBeGreaterThanOrEqual(1);
  });
});

describe('exam form', () => {
  const valid = { ...EMPTY_EXAM_FORM, title: 'مذاكرة', sectionId: '3', subjectId: '5', examDate: '2026-11-24' };
  it('requires title, section, subject and date, and sane marks', () => {
    expect(Object.keys(validateExamForm(EMPTY_EXAM_FORM, false)).sort()).toEqual(['examDate', 'sectionId', 'subjectId', 'title']);
    expect(validateExamForm(valid, false)).toEqual({});
    expect(validateExamForm({ ...valid, maxMark: '0' }, false).maxMark).toBe(ar.exams.invalidMark);
    expect(validateExamForm({ ...valid, passMark: '120' }, false).passMark).toBe(ar.exams.passAboveMax);
  });
  it('does not ask for section and subject when editing', () => {
    expect(validateExamForm({ ...valid, sectionId: null, subjectId: null }, true)).toEqual({});
  });
  it('builds the create payload with numbers and the update payload without section or subject', () => {
    expect(toCreatePayload({ ...valid, examTypeId: '1' })).toEqual({ sectionId: 3, subjectId: 5, examTypeId: 1, title: 'مذاكرة', examDate: '2026-11-24', maxMark: 100, passMark: 50 });
    expect('sectionId' in toUpdatePayload(valid)).toBe(false);
  });
  it('rebuilds the form of an exam from the server (ISO date, decimal strings)', () => {
    const form = examFormFrom({ id: 1, sectionId: 3, subjectId: 5, examTypeId: null, title: 'ت', examDate: '2026-11-24T00:00:00.000Z', maxMark: '100.00', passMark: '50', section: { id: 3, name: 'أ', academicYearId: 1 }, subject: { id: 5, name: 'ر' }, examType: null, _count: { results: 0 } });
    expect(form).toEqual(expect.objectContaining({ examDate: '2026-11-24', maxMark: '100', passMark: '50', examTypeId: null }));
  });
  it('parses positive numbers with at most two decimals', () => {
    expect(parsePositive('12,5')).toBe(12.5);
    expect(parsePositive('0')).toBeNull();
    expect(parsePositive('1.234')).toBeNull();
  });
  it('lists only the subjects of the chosen section', () => {
    const sections = [{ sectionId: 3, subjects: [{ subjectId: 5, name: 'ر' }] }, { sectionId: 4, subjects: [{ subjectId: 6, name: 'ف' }] }];
    expect(subjectOptions(sections, '4')).toEqual([{ value: '6', label: 'ف' }]);
    expect(subjectOptions(sections, null)).toEqual([]);
  });
});

describe('calendar helpers', () => {
  it('lays a month on a Saturday-first grid', () => {
    const cells = monthCells(2026, 10); // November 2026 starts on a Sunday
    expect(cells[0]).toBeNull();
    expect(cells[1]?.ymd).toBe('2026-11-01');
    expect(cells.filter(Boolean)).toHaveLength(30);
    expect(weekHeader()).toHaveLength(7);
  });
  it('moves across a year boundary', () => {
    expect(shiftMonth(2026, 11, 1)).toEqual({ year: 2027, month: 0 });
    expect(shiftMonth(2026, 0, -1)).toEqual({ year: 2025, month: 11 });
    expect(ymOf('2026-11-24')).toEqual({ year: 2026, month: 10 });
  });
});

describe('page stores', () => {
  it('resets the subject when the section changes in the exam form', () => {
    const store = createExamsStore();
    store.getState().setField('sectionId', '3');
    store.getState().setField('subjectId', '5');
    store.getState().setField('sectionId', '4');
    expect(store.getState().form.subjectId).toBeNull();
  });
  it('clears the saved notice and the error when the teacher types again', () => {
    const store = createMarksStore();
    store.getState().setSaved(true);
    store.getState().setSaveError('x');
    store.getState().setMark(1, '55');
    expect(store.getState().saved).toBe(false);
    expect(store.getState().saveError).toBeNull();
    expect(store.getState().edits[1]).toEqual({ text: '55', absent: false });
  });
  it('clears the mark when a student is marked absent and keeps the text when toggled back off', () => {
    const store = createMarksStore();
    store.getState().setMark(2, '70');
    store.getState().toggleAbsent(2);
    expect(store.getState().edits[2]).toEqual({ text: '', absent: true });
    store.getState().toggleAbsent(2);
    expect(store.getState().edits[2].absent).toBe(false);
  });
});
