import RadioButton from "@/components/ui/RadioButton";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean;
  value: string;
  step: { total: number, current: number }
  onSelect: (value: string) => void;
  onBack?: () => void;
  onConfirm: () => void;
  onCancel: () => void
}

export default function PaymentStep({ isVisible, value, step, onSelect, onBack, onConfirm, onCancel }: Props) { 
  function handleEmptyField() {
    if (value) {
      onConfirm();
    }
  }
  
  const options = [
    { label: 'O pagamento está concluído', value: 'concluded'},
    { label: 'O pagamento está pendente', value: 'pending' },
  ];

  return (
    <StepScreen
      isVisible={isVisible}
      title={"Editar transação"}
      step={step}
      onConfirm={handleEmptyField}
      onBack={onBack}
      onCancel={onCancel}
    >
      <RadioButton
        initialValue={value}
        gap={10}
        options={options}
        onSelecting={onSelect}
      />
    </StepScreen>
  );
};