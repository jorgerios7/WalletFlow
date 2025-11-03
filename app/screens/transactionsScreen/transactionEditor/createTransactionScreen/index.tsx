import { Entries, RecurrenceType, Transactions, TransactionType } from '@/app/types/Finance';
import { getAuth } from 'firebase/auth';
import { ReactNode, useState } from 'react';
import { Alert } from 'react-native';
import ContentScreen from '../contentScreen';
import { CategoryStep, DescriptionStep, DueDateStep, PaymentStep, RecurrenceScreen, StartDateStep, TotalValueStep } from './steps';

export default function CreateTransactionScreen(
  { isVisible, groupId, type, onDismiss, whenPaymentConcluded, children }
    :
    { isVisible: boolean, groupId: string, type: TransactionType, onDismiss: () => void, whenPaymentConcluded: (payment: string) => void, children?: ReactNode }
) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'Tabs' | 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment' | 'description' | 'paymentDate' | 'method' | 'paymentConcluded';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [transaction, setTransaction] = useState<Transactions>({
    transactionId: "", createdBy: currentUser.uid, createdAt: new Date().toISOString(), startDate: "", category: "", description: "",
    recurrenceType: "", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: "", purchasebank: ""
  });

  const [entries, setEntries] = useState<Partial<Entries>>({ type: "", entrieId: "", entrieNumber: 0, dueDate: "", value: 0, payment: "pending" });

  const [paymentType, setPaymentType] = useState('');

  const [loading, setLoading] = useState(false);

  async function uploadTransaction() {
    if (!currentUser) return null;

    //await UploadTransaction(currentUser?.uid, groupId, type, transaction, entries as Entries, setLoading);

    setTransaction({
      transactionId: "", createdBy: "", createdAt: "", startDate: "", category: "", purchasebank: "",
      description: "", recurrenceType: "", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: ""
    });

    setEntries({
      type: "", entrieId: "", entrieNumber: 0, dueDate: "", value: 0, payment: "",
      paymentDate: "", paymentMethod: "", paymentBankCard: "", paymentBank: ""
    });

    if (paymentType === 'concluded') {
      setCurrentStep('paymentConcluded');
    } else {
      onDismiss();
      Alert.alert("Sucesso!", "Transação salva com sucesso.");
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
    <ContentScreen
      visible={isVisible}
      title={renderTitle()}
      uploading={loading}
      children={
        <>
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
            onSelect={(selected) => setPaymentType(selected)}
            onConfirm={() => uploadTransaction()}
            onBack={() => setCurrentStep("description")}
            onCancel={onDismiss}
          />

          {currentStep === 'paymentConcluded' && children}
        </>
      }
    >
    </ContentScreen>
  );
}
