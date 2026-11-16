import { View } from 'react-native';
import { radius as radii, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Pressable } from '../pressable';
import { FROSTED, surfaceStyle } from './init/surface.variants';
import type { SurfaceProps } from './init/surface.types';
import { GlassLayer } from './ui/GlassLayer';
import { SurfaceBody, SurfaceFooter, SurfaceHeader } from './ui/SurfaceParts';

/**
 * Every card / panel: `<Surface variant="glass"><Surface.Header>..</Surface.Header><Surface.Body>..</Surface.Body></Surface>`.
 * With `onPress` the whole surface is a button.
 */
export function Surface({ variant = 'glass', tone, padding = 'lg', gap = 'md', radius = 'lg', onPress, label, children }: SurfaceProps) {
  const theme = useTheme();
  const shape = { borderRadius: radii[radius], overflow: 'hidden' as const };
  const body = (
    <View style={[shape, surfaceStyle(variant, theme, tone)]}>
      {FROSTED.includes(variant) ? <GlassLayer /> : null}
      <View style={{ padding: space[padding], gap: space[gap] }}>{children}</View>
    </View>
  );
  return onPress ? (
    <Pressable onPress={onPress} label={label ?? ''} scaleTo={0.98}>{body}</Pressable>
  ) : body;
}

Surface.Header = SurfaceHeader;
Surface.Body = SurfaceBody;
Surface.Footer = SurfaceFooter;
