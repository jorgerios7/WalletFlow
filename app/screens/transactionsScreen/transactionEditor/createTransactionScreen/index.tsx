import { LoadScreen } from '@/app/pages/LoadScreen';
import { UploadTransaction } from '@/app/services/firebase/FinanceService';
import { Entries, PaymentType, RecurrenceType, Transactions, TransactionType } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import {
  CategoryStep,
  DescriptionStep,
  DueDateStep,
  PaymentDateStep,
  PaymentStep,
  RecurrenceScreen,
  StartDateStep,
  TotalValueStep
} from './steps';

export default function CreateTransactionScreen(
  { isVisible, groupId, type, onDismiss }
    :
    { isVisible: boolean, groupId: string, type: TransactionType, onDismiss: () => void }
) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'Tabs' | 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment' | 'description' | 'paymentDate' | 'method';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [transaction, setTransaction] = useState<Transactions>({
    transactionId: "", createdBy: currentUser.uid, createdAt: new Date().toISOString(), startDate: "", category: "", description: "",
    recurrenceType: "", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: "", purchasebank: ""
  });

  const [entries, setEntries] = useState<Partial<Entries>>({ type: "", entrieId: "", entrieNumber: 0, dueDate: "", value: 0, payment: "" });

  const [loading, setLoading] = useState(false);

  async function uploadTransaction() {
    if (!currentUser) return null;

    await UploadTransaction(currentUser?.uid, groupId, type, transaction, entries as Entries, setLoading);

    onDismiss();
    Alert.alert("Sucesso!", "Transação salva com sucesso.");

    setTransaction({
      transactionId: "", createdBy: "", createdAt: "", startDate: "", category: "", purchasebank: "",
      description: "", recurrenceType: "", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: ""
    });

    setEntries({
      type: "", entrieId: "", entrieNumber: 0, dueDate: "", value: 0, payment: "",
      paymentDate: "", paymentMethod: "", paymentBankCard: "", paymentBank: ""
    });
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

          <Text style={{ fontWeight: 'bold', fontSize: 22 }}> {renderTitle()}</Text>

          {loading ? (
            <LoadScreen />
          ) : (
            <View style={styles.content}>
              <RecurrenceScreen
                isVisible={currentStep === "recurrence"}
                transactionType={type}
                recurrenceType={transaction.recurrenceType as RecurrenceType || 'single'}
                totalEntries={transaction.totalEntries}
                purchasingMethod={transaction.purchasingMethod}
                purchaseBankCard={transaction.purchaseBankCard}
                purchaseBank={transaction.purchasebank}
                onSelect={(recurrenceType, totalEntries, purchasingMethod, purchaseBankCard, purchaseBank) => {
                  {
                    setTransaction((prev) => (
                      {
                        ...prev, recurrenceType: recurrenceType, totalEntries: totalEntries, purchasingMethod: purchasingMethod,
                        purchaseBankCard: purchaseBankCard, purchaseBank: purchaseBank
                      }
                    ))
                  }
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
                recurrenceType={transaction.recurrenceType}
                value={entries.dueDate as string}
                onSelect={(selected) => setEntries((prev) => ({ ...prev, dueDate: selected }))}
                startDate={transaction.startDate}
                onConfirm={() => setCurrentStep("totalValue")}
                onBack={() => setCurrentStep("startDate")}
                onCancel={onDismiss}
              />

              <TotalValueStep
                isVisible={currentStep === "totalValue"}
                transactionType={type}
                value={transaction.totalValue}
                onSelect={(selected) => setTransaction((prev) => ({ ...prev, totalValue: selected }))}
                onConfirm={() => setCurrentStep("description")}
                onBack={() => setCurrentStep("dueDate")}
                onCancel={onDismiss}
              />

              <DescriptionStep
                isVisible={currentStep === "description"}
                value={transaction.description}
                onSelect={(selected) => setTransaction((prev) => ({ ...prev, description: selected }))}
                onConfirm={() => setCurrentStep("payment")}
                onBack={() => setCurrentStep("totalValue")}
                onCancel={onDismiss}
              />

              <PaymentStep
                isVisible={currentStep === "payment"}
                value={entries.payment as string}
                onSelect={(selected) => setEntries((prev) => ({ ...prev, payment: selected }))}
                onConfirm={() => entries.payment === 'pending' as PaymentType ? uploadTransaction() : console.log('create PaymentScreen!')}
                onBack={() => setCurrentStep("description")}
                onCancel={onDismiss}
              />






              <PaymentDateStep
                isVisible={currentStep === 'paymentDate'}
                value={entries.paymentDate as string}
                onSelect={(selected) => setEntries((prev) => ({ ...prev, paymentDate: selected }))}
                onConfirm={() => uploadTransaction()}
                onBack={() => setCurrentStep('description')}
                onCancel={onDismiss}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(175, 172, 172, 0.64)' },
  container: {
    width: '100%', minHeight: '80%', marginTop: '41%', backgroundColor: Colors.light.background, gap: 50,
    justifyContent: 'center', alignItems: 'center'
  },
  content: { gap: 50, justifyContent: 'center', alignItems: 'center' }
});
