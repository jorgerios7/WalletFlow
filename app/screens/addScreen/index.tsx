import { db } from '@/app/config/firebaseConfig';
import { Transactions } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  CategoryStep,
  DueDateStep,
  PaymentStep,
  RecurrenceScreen,
  StartDateStep,
  TotalValueStep
} from './steps/Steps';

export type Type = '' | 'income' | 'expense' | 'profit';

export default function AddScreen(
  { groupId, type, onDismiss }
    :
    { groupId: string, type: Type, onDismiss: (locate: string) => void }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'Tabs' | 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [data, setData] = useState<Transactions>({
    transactionId: "",
    createdBy: currentUser.uid,
    createdAt: "",
    accountId: "",
    startDate: "",
    type: type,
    category: "",
    dueDate: "",
    description: "",
    payment: "",
    isRecurrence: false,
    method: "",
    purpose: "",
    totalValue: 0,
    currentInstallment: 0
  });

  async function uploadData() {
    if (!currentUser) return null;
    try {
      const colRef = collection(db, "groups", groupId, "transactions");

      const docRef = await addDoc(colRef, {
        ...data,
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      await updateDoc(docRef, {
        transactionId: docRef.id,
      });

      Alert.alert("Sucesso!", "Transação salva com sucesso.");
      //setCurrentStep("category");
      onDismiss('Tabs');
      setData({
        transactionId: "",
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
        accountId: "",
        startDate: "",
        type: type,
        category: "",
        dueDate: "",
        description: "",
        payment: "",
        isRecurrence: false,
        method: "",
        purpose: "",
        totalValue: 0,
        currentInstallment: 0
      });
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", error.message || "Não foi possível salvar");
    }
  }

  function renderTitle() {
    if (type === 'income') {
      return 'Cadastro de Receita'
    } else if (type === 'profit') {
      return 'Cadastro de Lucro'
    } else {
      return 'Cadastro de Despesa'
    }
  }

  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
        {renderTitle()}
      </Text>

      <RecurrenceScreen
        isVisible={currentStep === "recurrence"}
        initialValue={data.isRecurrence ? 'recurrence' : 'single'}
        onSelect={(selected) => setData((prev) => ({ ...prev, isRecurrence: selected === 'recurrence' }))}
        onConfirm={() => setCurrentStep("category")}
        onBack={() => onDismiss("Tabs")}
      />

      <CategoryStep
        isVisible={currentStep === "category"}
        type={type}
        initialValue={data.category}
        onSelect={(selected) => setData((prev) => ({ ...prev, category: selected }))}
        onConfirm={() => setCurrentStep("startDate")}
        onBack={() => setCurrentStep("recurrence")}
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
        onConfirm={uploadData}
        onBack={() => setCurrentStep("totalValue")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.light.shadow, gap: 50,
    justifyContent: 'center', alignItems: 'center'
  }
});
