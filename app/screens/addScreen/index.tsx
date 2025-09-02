import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  CategoryStep,
  DueDateStep,
  PaymentStep,
  StartDateStep,
  TotalValueStep,
  TypeStep
} from './steps/Steps';

export default function AddScreen() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'type' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment';

  const [currentStep, setCurrentStep] = useState<Step>('type');

  const [data, setData] = useState<FormData>({
    createdBy: currentUser.uid,
    createdAt: new Date().toISOString(),
    startDate: "",
    type: "",
    category: "",
    dueDate: "",
    description: "",
    payment: "",
    recurrence: "",
    method: "",
    purpose: "",
    accountId: "",
    totalValue: 0,
  });

  interface FormData {
    createdBy: string;
    createdAt: string;
    startDate: string;
    type: string;
    category: string;
    dueDate: string;
    description: string;
    payment: string;
    recurrence: string;
    method: string;
    purpose: string;
    accountId: string;
    totalValue: number;
  }

  return (
    <View style={styles.container}>
      <TypeStep
        isVisible={currentStep === "type"}
        value={data.type}
        onSelect={(selected) => setData((prev) => ({ ...prev, type: selected }))}
        onConfirm={() => setCurrentStep("category")}
      />

      <CategoryStep
        isVisible={currentStep === "category"}
        value={data.category}
        onSelect={(selected) => setData((prev) => ({ ...prev, category: selected }))}
        onConfirm={() => setCurrentStep("startDate")}
        onBack={() => setCurrentStep("type")}
      />

      <StartDateStep
        isVisible={currentStep === "startDate"}
        value={data.startDate}
        onSelect={(selected) => setData((prev) => ({ ...prev, startDate: selected }))}
        onConfirm={() => setCurrentStep("dueDate")}
        onBack={() => setCurrentStep("category")}
      />

      <DueDateStep
        isVisible={currentStep === "dueDate"}
        value={data.dueDate}
        onSelect={(selected) => setData((prev) => ({ ...prev, dueDate: selected }))}
        onConfirm={() => setCurrentStep("totalValue")}
        onBack={() => setCurrentStep("startDate")}
      />

      <TotalValueStep
        isVisible={currentStep === "totalValue"}
        value={data.totalValue}
        onSelect={(selected) => setData((prev) => ({ ...prev, totalValue: selected }))}
        onConfirm={() => setCurrentStep("payment")}
        onBack={() => setCurrentStep("dueDate")}
      />

      <PaymentStep
        isVisible={currentStep === "payment"}
        value={data.payment}
        onSelect={(selected) => setData((prev) => ({ ...prev, payment: selected }))}
        onConfirm={() => { Alert.alert('Finalizado!', JSON.stringify(data, null, 2)) }}
        onBack={() => setCurrentStep("totalValue")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.shadow, justifyContent: 'center', alignItems: 'center' },
  //content: { width: 300, backgroundColor: Colors.light.shadow, flexDirection: 'column', gap: 30, alignSelf: 'center' },
});
