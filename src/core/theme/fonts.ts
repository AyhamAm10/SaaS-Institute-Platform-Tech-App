import { useFonts } from 'expo-font';
import {
  Alexandria_300Light, Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold,
} from '@expo-google-fonts/alexandria';

/** Loads the four Alexandria weights; true once ready (or failed, so the app never hangs on fonts). */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts({
    Alexandria_300Light, Alexandria_400Regular, Alexandria_500Medium, Alexandria_600SemiBold,
  });
  return loaded || !!error;
}
