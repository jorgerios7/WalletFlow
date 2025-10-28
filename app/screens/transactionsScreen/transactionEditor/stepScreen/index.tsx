import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import { StyleSheet } from "react-native";

export default function StepScreen({
  isVisible,
  children,
  onConfirm,
  onBack,
  onCancel
}: {
  isVisible: boolean;
  children: React.ReactNode;
  onConfirm: () => void;
  onBack?: () => void;
  onCancel: () => void;
}) {
  if (!isVisible) return null;

  return (
    <TransitionView style={styles.content}>
      {children}
      <CustomButton text="Confirmar" onPress={onConfirm} />
      {onBack && (
        <TextButton text="Voltar" onPress={onBack} />
      )}
      <TextButton text="Cancelar" onPress={onCancel} />
      

    </TransitionView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 300,
    backgroundColor: "Transparent",
    flexDirection: "column",
    gap: 20,
    alignSelf: "center",
  }
});
