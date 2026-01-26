import { PreferencesContext } from "@/app/context/PreferencesProvider";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import TransitionView from "@/components/ui/TransitionView";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onConfirm: () => void;
  buttonTextConfirm?: string,
  onBack?: () => void;
  onCancel?: () => void;
}

export default function StepScreen({ isVisible, children, buttonTextConfirm, onConfirm, onBack, onCancel }: Props) {
  if (!isVisible) return null;

  const { preferences } = useContext(PreferencesContext);

  const confirmText = buttonTextConfirm || "Confirmar";

  const totalSteps= 7;
  const currentStep = 1;

  const dynamicTextStyle = {
    color: Colors[preferences.theme.appearance].textPrimary,
    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight,
  }

  return (
    <TransitionView
      style={[
        styles.content,
        { backgroundColor: Colors[preferences.theme.appearance].surface }
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text
          style={dynamicTextStyle}
        >
          Cadastro de receita
        </Text>
 
        <Text
          style={dynamicTextStyle}
        >
          {currentStep} de {totalSteps}
        </Text>
      </View>

      {children}

      <CustomButton text={confirmText} onPress={onConfirm} />

      {onBack && (
        <TextButton text="Voltar" onPress={onBack} />
      )}

      {onCancel && (
        <TextButton text="Cancelar" onPress={onCancel} />
      )}

    </TransitionView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    padding: 20,
    alignSelf: "center",
    borderRadius: 10
  }
});
