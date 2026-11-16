import { Button, DateField, SelectField, Sheet, Stack, Text, TextField } from '@/components';
import { ar } from '@/core/strings/ar';
import { useExamsMirror } from '../store/exams.store';
import { subjectOptions } from '../utils/exam-days';

/** Create / edit sheet. Section and subject are chips of my own assignments and are fixed when editing. */
export function ExamFormSheet({ onSubmit }: { onSubmit: () => void }) {
  const open = useExamsMirror('formOpen');
  const editing = useExamsMirror('editing');
  const form = useExamsMirror('form');
  const errors = useExamsMirror('formErrors');
  const generalError = useExamsMirror('generalError');
  const isSubmitting = useExamsMirror('isSubmitting');
  const sections = useExamsMirror('sections');
  const examTypes = useExamsMirror('examTypes');
  const today = useExamsMirror('today');
  const setField = useExamsMirror('setField');
  const close = useExamsMirror('closeForm');
  const sectionChips = sections.map((s) => ({ value: String(s.sectionId), label: s.name }));

  return (
    <Sheet visible={open} onClose={close} label={editing ? ar.exams.formEdit : ar.exams.formCreate}>
      <Sheet.Header title={editing ? ar.exams.formEdit : ar.exams.formCreate} subtitle={editing ? ar.exams.formHint : undefined} />
      <Sheet.Content>
        <TextField label={ar.exams.title_} placeholder={ar.exams.titlePlaceholder} value={form.title} onChangeText={(v) => setField('title', v)} error={errors.title || undefined} />
        {editing ? (
          <Text tone="secondary">{`${editing.subject.name} · ${editing.section.name}`}</Text>
        ) : (
          <Stack gap="md">
            <SelectField label={ar.exams.section} options={sectionChips} value={form.sectionId} onChange={(v) => setField('sectionId', v)} error={errors.sectionId || undefined} />
            {form.sectionId ? <SelectField label={ar.exams.subject} options={subjectOptions(sections, form.sectionId)} value={form.subjectId} onChange={(v) => setField('subjectId', v)} error={errors.subjectId || undefined} /> : null}
          </Stack>
        )}
        {examTypes.length > 0 ? (
          <SelectField label={ar.exams.type} options={examTypes.map((t) => ({ value: String(t.id), label: t.name }))} value={form.examTypeId} onChange={(v) => setField('examTypeId', v)} />
        ) : null}
        <DateField
          label={ar.exams.date} value={form.examDate} onChange={(v) => setField('examDate', v)} today={today} placeholder={ar.exams.datePlaceholder}
          confirmLabel={ar.exams.pickDate} previousLabel={ar.exams.previousMonth} nextLabel={ar.exams.nextMonth} error={errors.examDate || undefined}
        />
        <TextField label={ar.exams.maxMark} value={form.maxMark} onChangeText={(v) => setField('maxMark', v)} keyboardType="decimal-pad" error={errors.maxMark || undefined} ltr />
        <TextField label={ar.exams.passMark} value={form.passMark} onChangeText={(v) => setField('passMark', v)} keyboardType="decimal-pad" error={errors.passMark || undefined} ltr />
        {generalError ? <Text tone="danger" accessibilityRole="alert">{generalError}</Text> : null}
      </Sheet.Content>
      <Sheet.Footer>
        <Button label={ar.common.cancel} onPress={close} variant="ghost" />
        <Button label={ar.exams.save} onPress={onSubmit} variant="accent" loading={isSubmitting} />
      </Sheet.Footer>
    </Sheet>
  );
}
