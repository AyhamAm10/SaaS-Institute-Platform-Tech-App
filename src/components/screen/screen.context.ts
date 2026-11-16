import { createContext, useContext } from 'react';

export interface ScreenContextValue {
  /** Reserve room for the floating tab bar under the scroll content. */
  withTabBar: boolean;
  onRefresh?: () => void;
  refreshing: boolean;
}

export const ScreenContext = createContext<ScreenContextValue>({ withTabBar: false, refreshing: false });

export const useScreen = (): ScreenContextValue => useContext(ScreenContext);
