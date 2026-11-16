import { useTheme } from '@/core/theme/ThemeProvider';
import { Box, Row } from '../layout';
import { Pressable } from '../pressable';
import { Text } from '../text';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Section title with the orange bar of the identity and an optional action link. */
export function SectionHeader({ title, actionLabel, onAction }: Props) {
  const theme = useTheme();
  return (
    <Row justify="between" px="xs">
      <Row gap="sm">
        <Box width={4} height={18} style={{ borderRadius: 2, backgroundColor: theme.brandAccent }} />
        <Text variant="heading" accessibilityRole="header">{title}</Text>
      </Row>
      {actionLabel && onAction ? (
        <Pressable label={actionLabel} onPress={onAction}><Text variant="label" tone="accent">{actionLabel}</Text></Pressable>
      ) : null}
    </Row>
  );
}
