import { ThemeContext } from "@/components/ThemeProvider";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import { useContext } from "react";
import { StyleSheet } from "react-native";

export default function StepScreen({
  isVisible,children, buttonTextConfirm, onConfirm, onBack, onCancel,
}: {
  isVisible: boolean; children: React.ReactNode; onConfirm: () => void;
  buttonTextConfirm?: string, onBack?: () => void; onCancel?: () => void;
}) {
  if (!isVisible) return null;

  const { theme, fontSizeType } = useContext(ThemeContext);

  const confirmText = buttonTextConfirm || "Confirmar";

  return (
    <TransitionView style={styles.content}>
      {children}

      <CustomButton text={confirmText} onPress={onConfirm} />

      {onBack && (<TextButton text="Voltar" onPress={onBack} />)}
      {onCancel && (<TextButton text="Cancelar" onPress={onCancel} />)}
    </TransitionView>
  );
}

const styles = StyleSheet.create({
  content: { width: 300, backgroundColor: "transparent", flexDirection: "column", gap: 20, alignSelf: "center" }
});
