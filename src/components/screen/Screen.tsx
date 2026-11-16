import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Ambient, type AmbientVariant } from '../ambient';
import { ScreenContext } from './screen.context';
import { ScreenBody } from './ui/ScreenBody';
import { ScreenHeader } from './ui/ScreenHeader';

interface Props {
  ambient?: AmbientVariant;
  withTabBar?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  children: ReactNode;
}

/** Canvas + ambient glow + safe area: `<Screen><Screen.Header>..</Screen.Header><Screen.Body>..</Screen.Body></Screen>`. */
export function Screen({ ambient = 'calm', withTabBar = false, onRefresh, refreshing = false, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScreenContext.Provider value={{ withTabBar, onRefresh, refreshing }}>
      <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: insets.top }}>
        <Ambient variant={ambient} />
        {children}
      </View>
    </ScreenContext.Provider>
  );
}

Screen.Header = ScreenHeader;
Screen.Body = ScreenBody;
