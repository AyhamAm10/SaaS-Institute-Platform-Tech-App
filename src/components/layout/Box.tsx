import { View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { layoutStyle, splitLayout } from './init/layout.style';
import type { LayoutProps } from './init/layout.types';

/** Token-typed View. The base of Stack, Row and Grid. */
export function Box({ style, ...props }: LayoutProps) {
  const theme = useTheme();
  const { layout, rest } = splitLayout(props);
  return <View {...rest} style={[layoutStyle(layout, theme), style]} />;
}
