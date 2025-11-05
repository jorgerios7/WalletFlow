import { UpdateEntry } from "@/app/services/firebase/FinanceService";
import { PaymentType, UpdateEntryValues } from "@/app/types/Finance";
import { useState } from "react";
import { View } from "react-native";
import { PaymentDateStep, PaymentMethodStep, PaymentStep } from "../createTransactionScreen/steps";

interface Props {
  iDs: { group: string, transaction: string, entry: string }, values: UpdateEntryValues, onDismiss: () => void
}

export default function PaymentScreen({ iDs, values, onDismiss }: Props) {

  const [currentStep, setCurrentStep] = useState<'payment' | 'paymentDate' | 'method'>('payment');

  const [isUploading, setIsUploading] = useState(false);

  const [entry, setEntry] = useState<UpdateEntryValues>(
    {
      paymentType: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod,
      paymentBankCard: values.paymentBankCard, paymentBank: values.paymentBank
    }
  );

  async function UpdateNewEntry() {
    await UpdateEntry({
      ids: {
        group: iDs.group,
        transaction: iDs.transaction,
        entry: iDs.entry,
      },
      newEntry: {
        paymentType: entry.paymentType,
        paymentDate: entry.paymentDate,
        paymentMethod: entry.paymentMethod,
        paymentBank: entry.paymentBank,
        paymentBankCard: entry.paymentBankCard
      },
      onUpdate: (isUpdating) => { setIsUploading(isUpdating) }
    });
  }

  return (
    <View>
      <PaymentStep
        isVisible={currentStep === 'payment'}
        value={entry.paymentType as string}
        onSelect={(selected) => setEntry((prev) => ({ ...prev, payment: selected }))}
        onConfirm={() => entry.paymentType === 'pending' as PaymentType ? console.log('invalid payment type') : setCurrentStep("paymentDate")}
        onCancel={onDismiss}
      />

      <PaymentDateStep
        isVisible={currentStep === 'paymentDate'}
        value={entry.paymentDate as string}
        onSelect={(selected) => setEntry((prev) => ({ ...prev, paymentDate: selected }))}
        onConfirm={() => setCurrentStep("method")}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('payment')}
      />

      <PaymentMethodStep
        isVisible={currentStep === 'method'}
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
    </View>
  );
}
