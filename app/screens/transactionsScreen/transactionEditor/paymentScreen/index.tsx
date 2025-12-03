import UpdateEntry from "@/app/services/firebase/financeService/updateEntry";
import { ThemeType } from "@/app/types/appearance";
import { PaymentType, UpdateEntryValues } from "@/app/types/Finance";
import { useState } from "react";
import { View } from "react-native";
import FinalStep from "../stepScreen/finalStep";
import PaymentDateStep from "./steps/paymentDateStep";
import PaymentMethodStep from "./steps/paymentMethodStep";
import PaymentStep from "./steps/paymentStep";

interface Props {
  theme: ThemeType, ids: { group: string, transaction: string, entry: string }, values: UpdateEntryValues, onUpdate: (isUpdating: boolean) => void, onDismiss: () => void
}

export default function PaymentScreen({ theme, ids, values, onUpdate, onDismiss }: Props) {

  const [currentStep, setCurrentStep] = useState<'paymentType' | 'paymentDate' | 'paymentMethod' | 'final'>('paymentType');

  const [entry, setEntry] = useState<UpdateEntryValues>(
    {
      paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
      paymentBankCard: values.paymentBankCard, paymentBank: values.paymentBank
    }
  );

  async function UpdateNewEntry() {
    await UpdateEntry({
      ids: { group: ids.group, transaction: ids.transaction, entry: ids.entry },
      newEntry: {
        paymentType: entry.paymentType, paymentDate: entry.paymentDate, paymentMethod: entry.paymentMethod,
        paymentBank: entry.paymentBank, paymentBankCard: entry.paymentBankCard
      },
      onUpdate: (updating) => {
        setEntry({ paymentType: "", paymentDate: "", paymentMethod: "", paymentBank: "", paymentBankCard: "" });
        onUpdate(updating);
        setCurrentStep("final");
      }
    });
  }

  return (
    <View>
      <PaymentStep
        isVisible={currentStep === 'paymentType'}
        theme={theme}
        value={entry.paymentType as string}
        onSelect={(selected) => setEntry((prev) => ({ ...prev, paymentType: selected }))}
        onConfirm={() => entry.paymentType === 'pending' as PaymentType && values.paymentType === 'pending' as PaymentType
          ? console.log('(paymentScreen.tsx) invalid payment type')
          : entry.paymentType === 'pending'
            ? console.log('(paymentScreen.tsx) Os dados serão apagados do banco de dados!.')
            : setCurrentStep("paymentDate")
        }
        onCancel={onDismiss}
      />

      <PaymentDateStep
        isVisible={currentStep === 'paymentDate'}
        theme={theme}
        value={entry.paymentDate as string}
        onSelect={(selected) => setEntry((prev) => ({ ...prev, paymentDate: selected }))}
        onConfirm={() => setCurrentStep("paymentMethod")}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentType')}
      />

      <PaymentMethodStep
        isVisible={currentStep === 'paymentMethod'}
        theme={theme}
        values={{
          paymentMethod: entry.paymentMethod as string, paymentBankCard: entry.paymentBankCard as string,
          paymentBank: entry.paymentBank as string
        }}
        onSelect={(value) => {
          setEntry((prev) => (
            { ...prev, paymentMethod: value.paymentMethod, paymentBank: value.paymentBank, paymentBankCard: value.paymentBankCard }
          ))
        }}
        onConfirm={() => UpdateNewEntry()}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentDate')}
      />

      <FinalStep
        isVisible={currentStep === 'final'}
        theme={theme}
        textAbove={'Atualização concluída com sucesso!'}
        textBelow={'Toque em confirmar para sair do editor de pagamento.'}
        onConfirm={onDismiss}
      />
    </View>
  );
}
