import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable as RNPressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { SheetContent } from './ui/SheetContent';
import { SheetFooter } from './ui/SheetFooter';
import { SheetHeader } from './ui/SheetHeader';

interface Props {
  visible: boolean;
  onClose: () => void;
  /** Spoken name of the sheet. */
  label: string;
  children: ReactNode;
}

/** Bottom sheet for forms and details: `<Sheet><Sheet.Header title=".." /><Sheet.Content>..</Sheet.Content><Sheet.Footer>..</Sheet.Footer></Sheet>`. */
export function Sheet({ visible, onClose, label, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} accessibilityLabel={label}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* The backdrop is a SIBLING of the sheet (never its parent): buttons inside must not nest in a button. */}
        <RNPressable accessibilityRole="button" accessibilityLabel={label} onPress={onClose} style={[StyleSheet.absoluteFill, { backgroundColor: theme.overlay }]} />
        <View
          style={{
            width: '100%', maxWidth: MAX_WIDTH, maxHeight: '90%', borderTopStartRadius: radius.xl, borderTopEndRadius: radius.xl,
            backgroundColor: theme.surfaceSolid, borderColor: theme.border, borderWidth: 1, boxShadow: theme.elev3, paddingBottom: insets.bottom + space.lg,
          }}
        >
          <View style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: theme.track, marginTop: space.sm }} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: space.xl, gap: space.lg }}>{children}</ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

Sheet.Header = SheetHeader;
Sheet.Content = SheetContent;
Sheet.Footer = SheetFooter;
