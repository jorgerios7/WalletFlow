import { ThemeType } from "@/app/types/appearance";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import { StyleSheet } from "react-native";

export default function StepScreen({
  isVisible, theme, children, buttonTextConfirm, onConfirm, onBack, onCancel,
}: {
  isVisible: boolean; theme: ThemeType, children: React.ReactNode; onConfirm: () => void;
  buttonTextConfirm?: string, onBack?: () => void; onCancel?: () => void;
}) {
  if (!isVisible) return null;

  const confirmText = buttonTextConfirm || "Confirmar";

  return (
    <TransitionView style={styles.content}>
      {children}

      <CustomButton theme={theme} text={confirmText} onPress={onConfirm} />

      {onBack && (<TextButton theme={theme} text="Voltar" onPress={onBack} />)}
      {onCancel && (<TextButton theme={theme} text="Cancelar" onPress={onCancel} />)}
    </TransitionView>
  );
}

const styles = StyleSheet.create({
  content: { width: 300, backgroundColor: "transparent", flexDirection: "column", gap: 20, alignSelf: "center" }
});
