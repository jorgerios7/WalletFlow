import { ThemeType } from "@/app/types/appearance";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function ValueStep(
  { isVisible, theme, transactionType, value, onConfirm, onBack, onSelect, onCancel }:
    StepsProps & { transactionType: string, value: number; onSelect: (value: number) => void }
) {

  function handleValue(value: number) { onSelect(transactionType === 'expense' ? - value : value) }

  return (
    <StepScreen
      isVisible={isVisible}
      theme={theme}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite um valor para continuar');
        }
      }}
      onBack={onBack}
      onCancel={onCancel}
    >
      <DynamicLabelInput
        numberEntry
        theme={theme}
        initialNumber={value}
        label={'Valor total'}
        onNumberChange={handleValue}
      />
    </StepScreen>
  );
};