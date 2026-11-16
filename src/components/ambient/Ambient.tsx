import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { AMBIENT, type AmbientVariant } from './init/ambient.variants';
import { Blob } from './ui/Blob';

/** Drifting orange glow behind a screen (static under Reduce Motion). Mounted once by `Screen`. */
export function Ambient({ variant = 'calm' }: { variant?: AmbientVariant }) {
  const { width, height } = useWindowDimensions();
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
      {AMBIENT[variant].map((spec, i) => (
        <Blob key={i} spec={spec} width={width} height={height} />
      ))}
    </View>
  );
}
