import { RecurrenceType } from "@/app/types/Finance";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { useEffect, useState } from "react";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void }
interface MethodProps { paymentBankCard: string, paymentMethod: string, paymentBank: string }

export default function PaymentMethodStep(
  { isVisible, values, onSelect, onConfirm, onBack, onCancel }
    : StepsProps & { values: MethodProps, onSelect: (values: MethodProps) => void }
) {

  const [selection, setSelection] = useState(
    { paymentMethod: values.paymentMethod, paymentBankCard: values.paymentBankCard, paymentBank: values.paymentBank }
  );

  function handleSelect() {
    const { paymentMethod, paymentBankCard, paymentBank } = selection;

    const baseSelection = { paymentMethod, paymentBankCard: "", paymentBank: "" };

    switch (paymentMethod) {
      case 'Dinheiro': case 'Boleto': onSelect(baseSelection);
        break;

      case 'Cartão de crédito': onSelect({ ...baseSelection, paymentBankCard, paymentBank });
        break;

      case 'Boleto': case 'Pix': case 'Transferência bancária': onSelect({ ...baseSelection, paymentBank });
        break;

      default: console.warn("Método de compra desconhecido:", paymentMethod);
    }
  }

  useEffect(() => { handleSelect() }, [selection]);

  return (
    <StepScreen
      isVisible={isVisible}
      onBack={onBack}
      onConfirm={() => onConfirm()}
      onCancel={onCancel}
    >
      <DropdownSelect
        isVisible
        onOpeningDropdown="openAtBottom"
        placeholder={'Método de pagamento'}
        setSelection={selection.paymentMethod}
        list={['Dinheiro', 'Pix', 'Cartão de crédito', 'Boleto', 'Transferência bancária']}
        onSelect={(value) => setSelection((prev) => ({ ...prev, paymentMethod: value as RecurrenceType }))}
      />

      <DropdownSelect
        isVisible={selection.paymentMethod === 'Cartão de crédito'}
        onOpeningDropdown="openAtBottom"
        placeholder={'Cartão bancário'}
        setSelection={selection.paymentBankCard}
        list={['Master(5885)', 'Visa(8822)']}
        onSelect={(value) => setSelection((prev) => ({ ...prev, paymentBankCard: value as string }))}
      />

      <DropdownSelect
        isVisible={
          selection.paymentMethod === 'Cartão de crédito' ||
          selection.paymentMethod === 'Pix' ||
          selection.paymentMethod === 'Transferência bancária'
        }
        onOpeningDropdown="openAtBottom"
        placeholder={'Instituição financeira'}
        setSelection={selection.paymentBank}
        list={['Santander', 'Nubank', 'Inter']}
        onSelect={(value) => setSelection((prev) => ({ ...prev, paymentBank: value as string }))}
      />
    </StepScreen>
  );
};