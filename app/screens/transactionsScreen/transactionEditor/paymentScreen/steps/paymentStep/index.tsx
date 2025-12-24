import RadioButton from "@/components/ui/RadioButton";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean;
  value: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
  onConfirm: () => void;
  onCancel: () => void
}

export default function PaymentStep({ isVisible, value, onSelect, onBack, onConfirm, onCancel }: Props) {

  function handleEmptyField() {
    if (value) {
      onConfirm();
    } else {
      Alert.alert('Nenhuma opção selecionada', 'Selecione uma opção para continuar');
    }
  }
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={handleEmptyField}
      onBack={onBack}
      onCancel={onCancel}
    >
      <RadioButton
        initialValue={value}
        gap={10}
        options={[
          { label: 'O pagamento está concluído', value: 'concluded' },
          { label: 'O pagamento está pendente', value: 'pending' },
        ]}
        onSelecting={onSelect}
      />
    </StepScreen>
  );
};