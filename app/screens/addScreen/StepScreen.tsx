import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import { StyleSheet } from "react-native";

export default function StepScreen({
  isVisible,
  children,
  onConfirm,
  onBack,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  onConfirm: () => void;
  onBack?: () => void;
}) {
  if (!isVisible) return null;

  return (
    <TransitionView style={styles.content}>
      {children}

      <CustomButton text="Confirmar" onPress={onConfirm} />

      {onBack && <TextButton text="Voltar" onPress={onBack} />}
    </TransitionView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: 300,
    backgroundColor: "transparent",
    flexDirection: "column",
    gap: 30,
    alignSelf: "center",
  },
});
