import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean;
  value: string;
  step: { total: number, current: number }
  onSelect: (value: string) => void
  onBack?: () => void;
  onConfirm: () => void;
  onCancel: () => void
}

export default function StartDateStep({ isVisible, value, step, onConfirm, onBack, onSelect, onCancel }: Props) {

  function handleEmptyField() {
    if (value) {
      onConfirm();
    } else {
      Alert.alert('Campo vazio', 'Digite uma data para continuar');
    }
  }

  return (
    <StepScreen
      isVisible={isVisible}
      title={"Cadastrar receita ou despesa?"}
      step={step}
      onConfirm={handleEmptyField}
      onBack={onBack}
      onCancel={onCancel}
    >
      <DynamicLabelInput
        dateEntry
        initialText={value}
        label={"Data de início"}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
};