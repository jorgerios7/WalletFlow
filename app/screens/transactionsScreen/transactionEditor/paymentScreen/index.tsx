import { Entries, PaymentType } from "@/app/types/Finance";
import { useState } from "react";
import { View } from "react-native";
import { PaymentDateStep, PaymentMethodStep, PaymentStep } from "../createTransactionScreen/steps";

interface Props {
  isVisible: boolean, values: { docId: string, paymentType: string, paymentDate: string, paymentMethod: string }, onDismiss: () => void
}

export default function PaymentScreen({ isVisible, values, onDismiss }: Props) {
  if (!isVisible) return null;

  const [currentStep, setCurrentStep] = useState<'payment' | 'description' | 'paymentDate' | 'method'>(values.paymentType === '' ? 'payment' : 'paymentDate');

  const [isUploading, setIsUploading] = useState(false);

  const [entries, setEntries] = useState<Partial<Entries>>(
    {
      entrieId: values.docId, payment: values.paymentType, paymentDate: values.paymentDate, paymentMethod: values.paymentMethod
    }
  );

  console.log('id: ', values.docId);

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
        paymentType={""}
        value={entries.paymentMethod as string}
        onSelect={(selected) => setEntries((prev) => ({ ...prev, paymentMethod: selected }))}
        onConfirm={() => setCurrentStep("payment")}
        onCancel={onDismiss}
        onBack={() => setCurrentStep('paymentDate')}
      />
    </View>

  );
}
