import { ThemeType } from "@/app/types/appearance";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Colors } from "@/constants/Colors";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function StartDateStep(
  { isVisible, theme, value, onConfirm, onBack, onSelect, onCancel }:
    StepsProps & { value: string; onSelect: (value: string) => void }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      theme={theme}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite uma data para continuar');
        }
      }}
      onBack={onBack}
      onCancel={onCancel}
    >
      <DynamicLabelInput
        dateEntry
        theme={theme}
        initialText={value}
        label={"Data de início"}
        colorLabel={Colors.light.background}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
};