import RadioButton from "@/components/ui/RadioButton";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function PaymentStep(
  { isVisible, value, onSelect, onBack, onConfirm, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Nenhuma opção selecionada', 'Selecione uma opção para continuar');
        }
      }}
      onBack={onBack}
      onCancel={onCancel}
    >
      <RadioButton
        initialValue={value}
        gap={30}
        options={[
          { label: 'O pagamento está concluído', value: 'concluded' },
          { label: 'O pagamento está pendente', value: 'pending' },
        ]}
        onSelecting={onSelect}
      />
    </StepScreen>
  );
};