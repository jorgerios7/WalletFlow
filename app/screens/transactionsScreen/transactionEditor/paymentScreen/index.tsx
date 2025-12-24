import { useFinancial } from "@/app/context/FinancialProvider";
import UpdateEntry from "@/app/services/firebase/financeService/updateEntry";
import { PaymentType, UpdateEntryProps, UpdateIdsProps, UpdatePaymentSteps } from "@/app/types/Finance";
import { useState } from "react";
import { View } from "react-native";
import FinalStep from "../stepScreen/finalStep";
import PaymentDateStep from "./steps/paymentDateStep";
import PaymentMethodStep from "./steps/paymentMethodStep";
import PaymentStep from "./steps/paymentStep";

interface Props {
  id: UpdateIdsProps, values: UpdateEntryProps, onDismiss: () => void
}

export default function PaymentScreen({ id, values, onDismiss }: Props) {
  const { group_id, refresh } = useFinancial();

  const [currentStep, setCurrentStep] = useState<UpdatePaymentSteps>('paymentType');

  const [newEntry, setNewEntry] = useState<UpdateEntryProps>({
    paymentType: values.paymentType,
    paymentDate: values.paymentDate,
    paymentMethod: values.paymentMethod,
    paymentBankCard: values.paymentBankCard,
    paymentBank: values.paymentBank
  });

  async function handleUpdate() {
    await UpdateEntry({
      groupId: group_id,
      ids: {
        transaction: id.transaction,
        entry: id.entry
      },
      newEntry: {
        paymentType: newEntry.paymentType,
        paymentDate: newEntry.paymentDate,
        paymentMethod: newEntry.paymentMethod,
        paymentBank: newEntry.paymentBank,
        paymentBankCard: newEntry.paymentBankCard
      },
  
      onRefresh: refresh
    });

    setCurrentStep("final");
  }

  return (
    <View>
      <PaymentStep
        isVisible={currentStep === 'paymentType'}
        value={newEntry.paymentType as string}
        onSelect={(selected) => setNewEntry((prev) => ({ ...prev, paymentType: selected }))}
        onConfirm={() => newEntry.paymentType === 'pending' as PaymentType && values.paymentType === 'pending' as PaymentType
          ? console.log('(paymentScreen.tsx) invalid payment type')
          : newEntry.paymentType === 'pending'
            ? console.log('(paymentScreen.tsx) Os dados serão apagados do banco de dados!.')
            : setCurrentStep("paymentDate")
        }
        onCancel={onDismiss}
      />

      <PaymentDateStep
        isVisible={currentStep === 'paymentDate'}
        value={newEntry.paymentDate as string}
        onSelect={(selected) => setNewEntry((prev) => ({ ...prev, paymentDate: selected }))}
        onConfirm={() => setCurrentStep("paymentMethod")}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentType')}
      />

      <PaymentMethodStep
        isVisible={currentStep === 'paymentMethod'}
        values={{
          paymentMethod: newEntry.paymentMethod as string, paymentBankCard: newEntry.paymentBankCard as string,
          paymentBank: newEntry.paymentBank as string
        }}
        onSelect={(value) => {
          setNewEntry((prev) => (
            { ...prev, paymentMethod: value.paymentMethod, paymentBank: value.paymentBank, paymentBankCard: value.paymentBankCard }
          ))
        }}
        onConfirm={() => handleUpdate()}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentDate')}
      />

      <FinalStep
        isVisible={currentStep === 'final'}
        textAbove={'Atualização concluída com sucesso!'}
        textBelow={'Toque em confirmar para sair do editor de pagamento.'}
        onConfirm={onDismiss}
      />
    </View>
  );
}
