import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/core/theme/ThemeProvider';

/** Frosted background of glass surfaces (blur + the surface's translucent fill sits on top). */
export function GlassLayer() {
  const theme = useTheme();
  return (
    <BlurView
      pointerEvents="none"
      intensity={theme.glassBlur}
      tint={theme.scheme === 'dark' ? 'dark' : 'light'}
      style={StyleSheet.absoluteFill}
    />
  );
}
