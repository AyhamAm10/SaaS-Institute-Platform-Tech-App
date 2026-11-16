import { ActivityIndicator } from 'react-native';
import { BRAND } from '@/core/brand';
import { useTheme } from '@/core/theme/ThemeProvider';
import { BrandMark } from '../brand-mark';
import { Box, Stack } from '../layout';
import { Text } from '../text';

/** Loading screen on the ink canvas: the logo, the institute name and a quiet spinner. */
export function BrandSplash({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <Box fill align="center" justify="center" style={{ backgroundColor: BRAND.ink }}>
      <Stack align="center" gap="lg">
        <BrandMark size="xl" glow />
        <Text variant="heading" tone="inverse">{BRAND.name}</Text>
        <ActivityIndicator color={theme.brandAccent} />
        <Text variant="caption" tone="inverse">{label}</Text>
      </Stack>
    </Box>
  );
}
