import { PreferencesContext } from '@/app/context/PreferencesProvider';
import CreateTransaction from '@/app/services/firebase/financeService/createTransaction';
import {
  DefTransCreationEntryValues,
  DefTransCreationValues,
  Entries,
  EntryCreationProps,
  TransactionCreationSteps,
  Transactions,
  TransactionType
} from '@/app/types/Finance';
import { getAuth } from 'firebase/auth';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FinalStep from '../stepScreen/finalStep';
import CategoryStep from './steps/categoryStep';
import DescriptionStep from './steps/descriptionStep';
import DueDateStep from './steps/dueDateStep';
import RecurrenceStep from './steps/recurrenceStep';
import StartDateStep from './steps/startDateStep';
import ValueStep from './steps/valueStep';

interface Props {
  isVisible: boolean;
  groupId: string;
  type: TransactionType;
  onDismiss: () => void;
}

export default function CreateTransactionScreen({ isVisible, groupId, type, onDismiss }: Props) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser || !isVisible) return null;

  const { preferences } = useContext(PreferencesContext);

  const [currentStep, setCurrentStep] = useState<TransactionCreationSteps>('recurrence');

  const [transaction, setTransaction] = useState<Transactions>(DefTransCreationValues);
  const [entries, setEntries] = useState<EntryCreationProps>(DefTransCreationEntryValues);

  const [loading, setLoading] = useState(false);

  async function uploadTransaction() {
    if (!currentUser) return null;

    setTransaction((prev) => ({ ...prev, createdBy: currentUser.uid }))

    await CreateTransaction(currentUser?.uid, groupId, type, transaction, entries as Entries, setLoading);

    setCurrentStep('final')

    setTransaction(DefTransCreationValues);
    setEntries(DefTransCreationEntryValues);
  }

  return (
    <View
      style={
        styles.container
      }
    >
      <RecurrenceStep
        isVisible={currentStep === "recurrence"}
        step={{total: 6, current: 1}}
        transactionType={type}
        values={transaction}
        onSelect={(values) => {
          setTransaction((prev) => ({
            ...prev,
            recurrenceType: values.recurrenceType,
            totalEntries: values.totalEntries,
            recurrenceFrequency: values.recurrenceFrequency,
            purchasingMethod: values.purchasingMethod,
            purchaseBankCard: values.purchaseBankCard,
            purchaseBank: values.purchaseBank,
          }))
        }}
        onConfirm={() => setCurrentStep("category")}
        onBack={onDismiss}
        onCancel={onDismiss}
      />

      <CategoryStep
        isVisible={currentStep === "category"}
        step={{total: 6, current: 2}}
        type={type}
        value={transaction.category}
        onSelect={(selected) => setTransaction((prev) => ({ ...prev, category: selected }))}
        onConfirm={() => setCurrentStep("startDate")}
        onBack={() => setCurrentStep("recurrence")}
        onCancel={onDismiss}
      />

      <StartDateStep
        isVisible={currentStep === "startDate"}
        step={{total: 6, current: 3}}
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
        step={{total: 6, current: 4}}
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
        step={{total: 6, current: 5}}
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
        step={{total: 6, current: 6}}
        value={transaction.description}
        onSelect={(selected) => setTransaction((prev) => ({ ...prev, description: selected }))}
        onConfirm={() => uploadTransaction()}
        onBack={() => setCurrentStep("totalValue")}
        onCancel={onDismiss}
      />

      <FinalStep
        isVisible={currentStep === "final"}
        title={"Cadastrar receita ou despesa?"}
        onConfirm={onDismiss}
        textAbove={'Todos os passos foram concluídos!'}
        textBelow={'Toque em confirmar para finalizar o cadastro da transação.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  }
})
