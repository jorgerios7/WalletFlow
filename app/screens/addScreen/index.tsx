import { db } from '@/app/config/firebaseConfig';
import { Payment, RecurrenceType, Transactions } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import {
  CategoryStep,
  DueDateStep,
  MethodStep,
  PaymentDateStep,
  PaymentStep,
  RecurrenceScreen,
  StartDateStep,
  TotalValueStep
} from './steps/Steps';

export type Type = '' | 'income' | 'expense' | 'profit';

export default function AddScreen(
  { isVisible, groupId, type, onDismiss }
    :
    { isVisible: boolean, groupId: string, type: Type, onDismiss: () => void }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'Tabs' | 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment' | 'paymentDate' | 'method';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [data, setData] = useState<Transactions>({
    transactionId: "",
    createdBy: currentUser.uid,
    createdAt: "",
    accountId: "",
    startDate: "",
    paymentDate: "",
    type: type,
    category: "",
    dueDate: "",
    description: "",
    payment: "",
    recurrenceType: "",
    installmentNumber: 0,
    method: "",
    totalValue: 0,
  });

  async function uploadData() {
    if (!currentUser) return null;

    try {
      const colRef = collection(db, "groups", groupId, "transactions");

      // Remove campos vazios ou zero
      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
          if (value === "" || value === 0) return false;
          return true;
        })
      );

      const docRef = await addDoc(colRef, {
        ...cleanedData,
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      await updateDoc(docRef, { transactionId: docRef.id });

      Alert.alert("Sucesso!", "Transação salva com sucesso.");

      onDismiss();
      setData({
        transactionId: "",
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
        accountId: "",
        startDate: "",
        paymentDate: "",
        type: type,
        category: "",
        dueDate: "",
        description: "",
        payment: "",
        recurrenceType: "",
        installmentNumber: 0,
        method: "",
        totalValue: 0,
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
    <Modal visible={isVisible} animationType={"slide"} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
            {renderTitle()}
          </Text>

          <RecurrenceScreen
            isVisible={currentStep === "recurrence"}
            initialValue={data.recurrenceType as RecurrenceType || 'single'}
            onSelect={(recurrenceType, installmentNumber) => {
              console.log('selection: ', recurrenceType, ' and ', installmentNumber);
              setData((prev) => ({
                ...prev,
                recurrenceType: recurrenceType,
                installmentNumber: installmentNumber
              }))
            }}
            onConfirm={() => setCurrentStep("category")}
            onBack={() => onDismiss()}
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
            onConfirm={() => data.payment === Payment.pending ? uploadData() : setCurrentStep('paymentDate')}
            onBack={() => setCurrentStep("totalValue")}
          />

          <PaymentDateStep
            isVisible={currentStep === 'paymentDate'}
            value={data.paymentDate}
            onSelect={(selected) => setData((prev) => ({ ...prev, paymentDate: selected }))}
            onConfirm={() => setCurrentStep('method')}
            onBack={() => setCurrentStep('payment')}
          />

          <MethodStep
            isVisible={currentStep === 'method'}
            value={data.method}
            onSelect={(selected) => setData((prev) => ({ ...prev, method: selected }))}
            onConfirm={() => uploadData()}
            onBack={() => setCurrentStep('paymentDate')}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "#00000031" },
  container: {
    width: '100%', height: '80%', marginTop: '41%', backgroundColor: Colors.light.background, gap: 50,
    justifyContent: 'center', alignItems: 'center'
  }
});
