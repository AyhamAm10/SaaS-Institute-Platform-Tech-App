import type { ReactNode } from 'react';
import { Modal, Pressable as RNPressable, StyleSheet, View } from 'react-native';
import { MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { DialogActions } from './ui/DialogActions';
import { DialogBody } from './ui/DialogBody';
import { DialogTitle } from './ui/DialogTitle';

interface Props {
  visible: boolean;
  onClose: () => void;
  /** Spoken name of the dialog. */
  label: string;
  children: ReactNode;
}

/** Confirmation / warning: `<Dialog><Dialog.Title icon=".." >..</Dialog.Title><Dialog.Body>..</Dialog.Body><Dialog.Actions>..</Dialog.Actions></Dialog>`. */
export function Dialog({ visible, onClose, label, children }: Props) {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} accessibilityLabel={label}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl }}>
        {/* The backdrop is a SIBLING of the card, so the dialog's buttons are never nested in a button. */}
        <RNPressable accessibilityRole="button" accessibilityLabel={label} onPress={onClose} style={[StyleSheet.absoluteFill, { backgroundColor: theme.overlay }]} />
        <View
          style={{
            width: '100%', maxWidth: MAX_WIDTH - 80, borderRadius: radius.xl, backgroundColor: theme.surfaceSolid, padding: space.xl,
            gap: space.lg, borderColor: theme.border, borderWidth: 1, boxShadow: theme.elev3,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

Dialog.Title = DialogTitle;
Dialog.Body = DialogBody;
Dialog.Actions = DialogActions;
