import { UpdateEntry } from "@/app/services/firebase/FinanceService";
import { Entries, PaymentType } from "@/app/types/Finance";
import { useState } from "react";
import { View } from "react-native";
import { PaymentDateStep, PaymentMethodStep, PaymentStep } from "../createTransactionScreen/steps";

interface Props {
  values: {
    group_id: string, transaction_id: string, entry_id: string, paymentType: string,
    paymentDate: string, paymentMethod: string, paymentBank: string, paymentBankCard: string
  },
  onDismiss: () => void
}

export default function PaymentScreen({ values, onDismiss }: Props) {

  const [currentStep, setCurrentStep] = useState<'payment' | 'paymentDate' | 'method'>('payment');

  const [isUploading, setIsUploading] = useState(false);

  const [entries, setEntries] = useState<Partial<Entries>>(
    {
      payment: values.paymentType, paymentDate: values.paymentDate,
      paymentMethod: values.paymentMethod, paymentBankCard: values.paymentBankCard, paymentBank: values.paymentBank
    }
  );

  async function UpdateNewEntry() {
    await UpdateEntry({
      group_id: values.group_id,
      transaction_id: values.transaction_id,
      entry_id: values.entry_id,
      newEntry: {
        payment: entries.payment,
        paymentDate: entries.paymentDate,
        paymentMethod: entries.paymentMethod,
        paymentBank: entries.paymentBank,
        paymentBankCard: entries.paymentBankCard
      },
      onUpdate: (isUpdating) => { setIsUploading(isUpdating) }
    });
  }

  return (
    <View>
      <PaymentStep
        isVisible={currentStep === 'payment'}
        value={entries.payment as string}
        onSelect={(selected) => setEntries((prev) => ({ ...prev, payment: selected }))}
        onConfirm={() => entries.payment === 'pending' as PaymentType ? console.log('invalid payment type') : setCurrentStep("paymentDate")}
        onCancel={onDismiss}
      />

      <PaymentDateStep
        isVisible={currentStep === 'paymentDate'}
        value={entries.paymentDate as string}
        onSelect={(selected) => setEntries((prev) => ({ ...prev, paymentDate: selected }))}
        onConfirm={() => setCurrentStep("method")}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('payment')}
      />

      <PaymentMethodStep
        isVisible={currentStep === 'method'}
        values={{
          paymentBankCard: entries.paymentBankCard as string, paymentMehod: entries.paymentMethod as string,
          paymentBank: entries.paymentBank as string
        }}
        onSelect={(value) => {
          setEntries((prev) => (
            { ...prev, paymentMethod: value.paymentMehod, paymentBank: value.paymentBank, paymentBankCard: value.paymentBankCard }
          ))
        }}
        onConfirm={() => UpdateNewEntry()}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentDate')}
      />
    </View>
  );
}
