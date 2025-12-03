import UploadTransaction from '@/app/services/firebase/financeService/uploadTransaction';
import { ThemeType } from '@/app/types/appearance';
import { Entries, RecurrenceType, Transactions, TransactionType } from '@/app/types/Finance';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import ContentScreen from '../contentScreen';
import FinalStep from '../stepScreen/finalStep';
import CategoryStep from './steps/categoryStep';
import DescriptionStep from './steps/descriptionStep';
import DueDateStep from './steps/dueDateStep';
import RecurrenceStep from './steps/recurrenceStep';
import StartDateStep from './steps/startDateStep';
import ValueStep from './steps/valueStep';

export default function CreateTransactionScreen(
  { theme, isVisible, groupId, type, onDismiss }: { theme: ThemeType, isVisible: boolean, groupId: string, type: TransactionType, onDismiss: () => void }
) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  type Step = 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'description' | 'paymentConcluded' | 'final';

  const [currentStep, setCurrentStep] = useState<Step>('recurrence');

  const [transaction, setTransaction] = useState<Transactions>({
    transactionId: "", createdBy: currentUser.uid, createdAt: new Date().toISOString(), startDate: "", category: "", description: "",
    recurrenceType: "none", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: "", purchaseBank: "", recurrenceFrequency: "none"
  });

  const [entries, setEntries] = useState<Partial<Entries>>(
    { paymentType: "pending", entrieId: "", entrieNumber: 0, dueDate: "", value: 0 }
  );

  const [loading, setLoading] = useState(false);

  async function uploadTransaction() {
    if (!currentUser) return null;

    await UploadTransaction(currentUser?.uid, groupId, type, transaction, entries as Entries, setLoading);

    setCurrentStep('final')

    setTransaction({
      transactionId: "", createdBy: "", createdAt: "", startDate: "", category: "", purchaseBank: "", recurrenceFrequency: "none",
      description: "", recurrenceType: "none", totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: ""
    });

    setEntries({
      paymentType: "none", entrieId: "", entrieNumber: 0, dueDate: "", value: 0,
      paymentDate: "", paymentMethod: "", paymentBankCard: "", paymentBank: ""
    });
  }

  function renderTitle() { return type === 'income' ? 'Cadastro de Receita' : 'Cadastro de Despesa' }

  return (
    <ContentScreen
      theme={theme}
      visible={isVisible}
      title={renderTitle()}
      uploading={loading}
      children={
        <>
          <RecurrenceStep
            isVisible={currentStep === "recurrence"}
            theme={theme}
            transactionType={type}
            values={{
              recurrenceType: transaction.recurrenceType as RecurrenceType, totalEntries: transaction.totalEntries,
              purchasingMethod: transaction.purchasingMethod, purchaseBankCard: transaction.purchaseBankCard,
              purchaseBank: transaction.purchaseBank, recurrenceFrequency: transaction.recurrenceFrequency
            }}
            onSelect={({ recurrenceType, recurrenceFrequency, totalEntries, purchasingMethod, purchaseBankCard, purchaseBank }) => {
              setTransaction((prev) => ({
                ...prev, recurrenceType: recurrenceType, totalEntries: totalEntries, recurrenceFrequency: recurrenceFrequency,
                purchasingMethod: purchasingMethod, purchaseBankCard: purchaseBankCard, purchaseBank: purchaseBank
              }))
            }}
            onConfirm={() => setCurrentStep("category")}
            onBack={() => onDismiss()}
            onCancel={onDismiss}
          />

          <CategoryStep
            isVisible={currentStep === "category"}
            theme={theme}
            type={type}
            value={transaction.category}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, category: selected }))}
            onConfirm={() => setCurrentStep("startDate")}
            onBack={() => setCurrentStep("recurrence")}
            onCancel={onDismiss}
          />

          <StartDateStep
            isVisible={currentStep === "startDate"}
            theme={theme}
            value={transaction.startDate}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, startDate: selected }))}
            onConfirm={() => setCurrentStep(
              transaction.recurrenceFrequency === "daily"
                ? "totalValue"
                : "dueDate"
            )}
            onBack={() => setCurrentStep("category")}
            onCancel={onDismiss}
          />

          <DueDateStep
            isVisible={currentStep === "dueDate"}
            theme={theme}
            recurrenceType={transaction.recurrenceType}
            recurrenceFrequency={transaction.recurrenceFrequency}
            value={entries.dueDate as string}
            onSelect={(selected) => setEntries((prev) => ({ ...prev, dueDate: selected }))}
            startDate={transaction.startDate}
            onConfirm={() => setCurrentStep("totalValue")}
            onBack={() => setCurrentStep("startDate")}
            onCancel={onDismiss}
          />

          <ValueStep
            isVisible={currentStep === "totalValue"}
            theme={theme}
            transactionType={type}
            value={transaction.totalValue}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, totalValue: selected }))}
            onConfirm={() => setCurrentStep("description")}
            onBack={() => setCurrentStep(
              transaction.recurrenceFrequency === "daily"
                ? "category"
                : "dueDate"
            )}
            onCancel={onDismiss}
          />

          <DescriptionStep
            isVisible={currentStep === "description"}
            theme={theme}
            value={transaction.description}
            onSelect={(selected) => setTransaction((prev) => ({ ...prev, description: selected }))}
            onConfirm={() => uploadTransaction()}
            onBack={() => setCurrentStep("totalValue")}
            onCancel={onDismiss}
          />

          <FinalStep
            isVisible={currentStep === "final"}
            theme={theme}
            onConfirm={onDismiss}
            textAbove={'Todos os passos foram concluídos!'}
            textBelow={'Toque em confirmar para finalizar o cadastro da transação.'}
          />
        </>
      }
    >
    </ContentScreen>
  );
}
