import { I18nManager, Platform } from 'react-native';

/**
 * The app is Arabic-only, so layout is always RTL. On native this is enforced at startup
 * (forceRTL needs a reload the first time; the app.json `supportsRTL` extra makes builds RTL from first launch).
 * On web the HTML document carries dir="rtl" (see src/app/+html.tsx).
 */
export function enforceRTL(): void {
  if (Platform.OS === 'web') return;
  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);
  if (!I18nManager.isRTL) I18nManager.forceRTL(true);
}
