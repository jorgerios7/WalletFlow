import { PreferencesContext } from "@/app/context/PreferencesProvider";
import CustomButton from "@/components/ui/CustomButton";
import TextButton from "@/components/ui/TextButton";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  isVisible: boolean;
  title: string;
  step?: { total: number, current: number }
  buttonTextConfirm?: string,
  children: React.ReactNode;
  onConfirm: () => void;
  onBack?: () => void;
  onCancel?: () => void;
}

export default function StepScreen({ isVisible, title, step, buttonTextConfirm, children, onConfirm, onBack, onCancel }: Props) {
  if (!isVisible) return null;

  const { preferences } = useContext(PreferencesContext);

  const confirmText = buttonTextConfirm || "Confirmar";

  const dynamicTextStyle = {
    color: Colors[preferences.theme.appearance].textPrimary,
    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight,
  }

  return (
    <View
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
          {title}
        </Text>

        {step && <Text
          style={dynamicTextStyle}
        >
          {step.current} de {step.total}
        </Text>}
      </View>
      <View style={styles.childrenContainer}>
        {children}
      </View>

      <View style={styles.btContainer}>
        <CustomButton text={confirmText} onPress={onConfirm} />

        {onBack && (
          <TextButton text="Voltar" onPress={onBack} />
        )}

        {onCancel && (
          <TextButton text="Cancelar" onPress={onCancel} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    flexDirection: "column",
    gap: 40,
    padding: 20,
    alignSelf: "center",
    borderRadius: 10
  },
  childrenContainer: {
    width: "100%",
    gap: 10
  },
  btContainer: {
    width: "100%",
    gap: 10
  }
});
