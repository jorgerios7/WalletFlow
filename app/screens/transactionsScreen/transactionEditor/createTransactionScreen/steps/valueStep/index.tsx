import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean;
  transactionType: string,
  value: number;
  onSelect: (value: number) => void;
  onBack?: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ValueStep(
  { isVisible, transactionType, value, onConfirm, onBack, onSelect, onCancel }: Props) {

  function handleValue(value: number) {
    onSelect(
      transactionType === 'expense'
        ? - value
        : value
    )
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