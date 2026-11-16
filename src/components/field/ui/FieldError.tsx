import { Text } from '../../text';

/** Announced by screen readers as a live region, so a validation error is heard. */
export function FieldError({ children }: { children: string }) {
  return <Text variant="caption" tone="danger" accessibilityLiveRegion="polite" accessibilityRole="alert">{children}</Text>;
}
