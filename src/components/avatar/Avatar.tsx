import { useTheme } from '@/core/theme/ThemeProvider';
import { Box } from '../layout';
import { Text } from '../text';

const SIZE = { sm: 32, md: 44, lg: 64 } as const;

interface Props { name: string; size?: keyof typeof SIZE }

/** First letter of the name on a soft orange disc. */
export function Avatar({ name, size = 'md' }: Props) {
  const theme = useTheme();
  const letter = name.trim().charAt(0);
  return (
    <Box
      width={SIZE[size]} height={SIZE[size]} align="center" justify="center" accessibilityElementsHidden
      style={{ borderRadius: SIZE[size] / 2, backgroundColor: theme.brandAccentSoft, borderColor: theme.brandAccentRing, borderWidth: 1 }}
    >
      <Text variant={size === 'lg' ? 'heading' : 'label'} tone="accent">{letter}</Text>
    </Box>
  );
}
