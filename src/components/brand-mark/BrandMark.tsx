import { Image } from 'react-native';
import { BRAND } from '@/core/brand';
import { BRAND_LOGO } from '@/core/brand/logo';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Box } from '../layout';

const SIZE = { sm: 40, lg: 88, xl: 120 } as const;

interface Props { size?: keyof typeof SIZE; glow?: boolean }

/** The institute logo on its ink tile. Identity comes from `core/brand` only. */
export function BrandMark({ size = 'sm', glow }: Props) {
  const theme = useTheme();
  const px = SIZE[size];
  return (
    <Box
      width={px} height={px} accessible accessibilityRole="image" accessibilityLabel={BRAND.logoLabel}
      style={{ borderRadius: px * 0.28 > radius.xl ? radius.xl : px * 0.28, overflow: 'hidden', backgroundColor: BRAND.ink, ...(glow && { boxShadow: theme.brandGlow }) }}
    >
      <Image source={BRAND_LOGO} style={{ width: px, height: px }} resizeMode="cover" />
    </Box>
  );
}
