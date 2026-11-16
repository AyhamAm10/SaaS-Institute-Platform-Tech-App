import type { ReactNode } from 'react';
import { Stack } from '../layout';
import { FieldControl } from './ui/FieldControl';
import { FieldError } from './ui/FieldError';
import { FieldHint } from './ui/FieldHint';
import { FieldLabel } from './ui/FieldLabel';

interface Props {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

/** Frame of every input: label, the control, then the error (or the hint). */
export function Field({ label, hint, error, children }: Props) {
  return (
    <Stack gap="xs">
      <Field.Label>{label}</Field.Label>
      <Field.Control invalid={!!error}>{children}</Field.Control>
      {error ? <Field.Error>{error}</Field.Error> : hint ? <Field.Hint>{hint}</Field.Hint> : null}
    </Stack>
  );
}

Field.Label = FieldLabel;
Field.Control = FieldControl;
Field.Hint = FieldHint;
Field.Error = FieldError;
