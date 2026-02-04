import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean;
  value: number;
  step: { total: number, current: number }
  onSelect: (value: number) => void;
  onBack?: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ValueStep(
  { isVisible, value, step, onConfirm, onBack, onSelect, onCancel }: Props) {

  function handleValue(value: number) {
    onSelect(value)
  }

  function handleEmptyField() {
    if (value) {
      onConfirm();
    } else {
      Alert.alert('Campo vazio', 'Digite um valor para continuar');
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
        numberEntry
        initialNumber={value}
        label={'Valor total'}
        onNumberChange={handleValue}
      />
    </StepScreen>
  );
};