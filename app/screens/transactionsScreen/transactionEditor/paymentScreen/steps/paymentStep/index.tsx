import { ThemeType } from "@/app/types/appearance";
import RadioButton from "@/components/ui/RadioButton";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function PaymentStep(
  { isVisible, theme, value, onSelect, onBack, onConfirm, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      theme={theme}
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
        theme={theme}
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