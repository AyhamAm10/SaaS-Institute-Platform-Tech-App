import { Row, Stack } from '../../layout';
import { Icon, type IconName } from '../../icon';
import { Text } from '../../text';
import type { Tone } from '@/core/theme/tones';

interface Props { children: string; icon?: IconName; tone?: Tone }

/** Dialog title with an optional tinted icon (danger for destructive confirmations). */
export function DialogTitle({ children, icon, tone = 'neutral' }: Props) {
  return (
    <Row gap="md">
      {icon ? <Stack><Icon name={icon} tone={tone} size="lg" /></Stack> : null}
      <Text variant="heading" accessibilityRole="header">{children}</Text>
    </Row>
  );
}
