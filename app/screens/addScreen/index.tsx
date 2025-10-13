import { db } from '@/app/config/firebaseConfig';
import { Installment, Payment, RecurrenceType, Transactions } from '@/app/types/Finance';
import { FormatDateBR, SepareteDate } from '@/app/utils/Format';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import {
  CategoryStep,
  DescriptionStep,
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

  type Step = 'Tabs' | 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment' | 'description' | 'paymentDate' | 'method';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [transaction, setTransaction] = useState<Transactions>({
    transactionId: "", createdBy: currentUser.uid, createdAt: new Date().toISOString(), accountId: "", startDate: "", paymentDate: "",
    type: type, category: "", dueDate: "", description: "", payment: "", recurrenceType: "", installmentTotalNumber: 0, method: "",
    totalValue: 0, installmentId: ""
  });

  const [installment, setInstallment] = useState<Installment>({ installmentId: "", installmentNumber: 0, dueDate: "", value: 0, payment: "", paymentDate: "", method: "" });

  async function uploadData() {
    if (!currentUser || !groupId) return null;

    try {
      const transactionDataCleaned = Object.fromEntries(
        Object.entries(transaction).filter(([_, value]) => {
          if (value === "") return false;
          return true;
        })
      );

      const installmentDataCleaned = Object.fromEntries(
        Object.entries(installment).filter(([_, value]) => {
          if (value === "") return false;
          return true;
        })
      );

      const transactionRef = collection(db, "groups", groupId, "transactions");

      const transactionDocRef = await addDoc(transactionRef,
        {
          ...transactionDataCleaned, transactionId: transactionRef.id, createdBy: currentUser.uid,
          createdAt: new Date().toISOString(), totalValue: transaction.totalValue
        });

      const installmentRef = collection(db, "groups", groupId, "transactions", transactionDocRef.id, 'installments');

      const startDate = SepareteDate(installment.dueDate);

      const installmentsPromises = Array.from({ length: transaction.installmentTotalNumber || 1 }).map((_, i) => {
        const dueDate = new Date(startDate);
        const value = (transaction.totalValue / transaction.installmentTotalNumber);

        dueDate.setMonth(dueDate.getMonth() + i);

        return addDoc(installmentRef, { ...installmentDataCleaned, installmentId: installmentRef.id, installmentNumber: i, totalValue: value, dueDate: FormatDateBR(dueDate) });
      });

      await Promise.all(installmentsPromises);

      setTransaction(
        {
          transactionId: "", createdBy: "", createdAt: "", accountId: "", startDate: "", paymentDate: "", type: type, category: "",
          dueDate: "", description: "", payment: "", recurrenceType: "", installmentTotalNumber: 0, method: "", totalValue: 0, installmentId: ""
        }
      );

      setInstallment({ installmentId: "", installmentNumber: 0, dueDate: "", value: 0, payment: "", paymentDate: "", method: "" });

      onDismiss();
      Alert.alert("Sucesso!", "Transação salva com sucesso.");

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
            value={transaction.recurrenceType as RecurrenceType || 'single'}
            onSelect={(recurrenceType, installmentNumber) => {
              setTransaction((prev) => ({ ...prev, recurrenceType: recurrenceType, installmentNumber: installmentNumber }));
            }}
            onConfirm={() => setCurrentStep("category")}
            onBack={() => onDismiss()}
            onCancel={onDismiss}
          />

          <CategoryStep
            isVisible={currentStep === "category"}
            type={type}
            value={transaction.category}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, category: selected }))}
            onConfirm={() => setCurrentStep("startDate")}
            onBack={() => setCurrentStep("recurrence")}
            onCancel={onDismiss}
          />

          <StartDateStep
            isVisible={currentStep === "startDate"}
            value={transaction.startDate}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, startDate: selected }))}
            onConfirm={() => setCurrentStep("dueDate")}
            onBack={() => setCurrentStep("category")}
            onCancel={onDismiss}
          />

          <DueDateStep
            isVisible={currentStep === "dueDate"}
            value={installment.dueDate}
            onSelect={(selected) => setInstallment((prev) => ({ ...prev, dueDate: selected }))}
            onConfirm={() => setCurrentStep("totalValue")}
            onBack={() => setCurrentStep("startDate")}
            onCancel={onDismiss}
          />

          <TotalValueStep
            isVisible={currentStep === "totalValue"}
            value={transaction.totalValue}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, totalValue: selected }))}
            onConfirm={() => setCurrentStep("payment")}
            onBack={() => setCurrentStep("dueDate")}
            onCancel={onDismiss}
          />

          <PaymentStep
            isVisible={currentStep === "payment"}
            value={installment.payment}
            onSelect={(selected) => setInstallment((prev) => ({ ...prev, payment: selected }))}
            onConfirm={() => transaction.payment === Payment.pending ? uploadData() : setCurrentStep('description')}
            onBack={() => setCurrentStep("totalValue")}
            onCancel={onDismiss}
          />

          <DescriptionStep
            isVisible={currentStep === "description"}
            value={transaction.description}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, description: selected }))}
            onConfirm={() => setCurrentStep('paymentDate')}
            onBack={() => setCurrentStep("payment")}
            onCancel={onDismiss}
          />

          <PaymentDateStep
            isVisible={currentStep === 'paymentDate'}
            value={installment.paymentDate}
            onSelect={(selected) => setInstallment((prev) => ({ ...prev, paymentDate: selected }))}
            onConfirm={() => setCurrentStep('method')}
            onBack={() => setCurrentStep('description')}
            onCancel={onDismiss}
          />

          <MethodStep
            isVisible={currentStep === 'method'}
            value={installment.method}
            onSelect={(selected) => setInstallment((prev) => ({ ...prev, method: selected }))}
            onConfirm={() => uploadData()}
            onBack={() => setCurrentStep('paymentDate')}
            onCancel={onDismiss}
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
