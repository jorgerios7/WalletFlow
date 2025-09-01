import CustomButton from '@/components/ui/CustomButton';
import DynamicLabelInput from '@/components/ui/DynamicLabelInput';
import RadioButton from '@/components/ui/RadioButton';
import SearchDropdown from '@/components/ui/SearchDropdown';
import TextButton from '@/components/ui/TextButton';
import TransitionView from '@/components/ui/TransitionView';
import { Colors } from '@/constants/Colors';
import { getAuth } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export function AddScreen() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  const [currentStep, setCurrentStep] = useState<Step>('type');

  const [data, setData] = useState<FormData>({
    createdBy: currentUser.uid,
    createdAt: new Date().toISOString(),
    startDate: '',
    type: '',
    category: '',
    dueDate: '',
    description: '',
    isPaid: false,
    isRecurrence: false,
    method: '',
    purpose: '',
    accountId: '',
    totalValue: 0,
  });

  type Step = 'type' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'payment';

  interface FormData {
    createdBy: string;
    createdAt: string;
    startDate: string;
    type: string;
    category: string;
    dueDate: string;
    description: string;
    isPaid: boolean;
    isRecurrence: boolean;
    method: string;
    purpose: string;
    accountId: string;
    totalValue: number;
  }

  enum Label {
    income = 'Adicionar uma Receita Financeira',
    expense = 'Adicionar uma Despesa Financeira',
  }

  enum Value {
    income = 'income',
    expense = 'expense',
  }

  function StepScreen({
    isVisible,
    children,
    onConfirm,
    onBack,
  }: {
    isVisible: boolean;
    children: React.ReactNode;
    onConfirm: () => void;
    onBack?: () => void;
  }) {
    if (!isVisible) return null;

    return (
      <TransitionView style={styles.content}>
        {children}

        <CustomButton text="Confirmar" onPress={onConfirm} />

        {onBack && <TextButton text="Voltar" onPress={onBack} />}
      </TransitionView>
    );
  }

  const TypeStep = () => {
    const value = useRef<string>('');
    return (
      <StepScreen
        isVisible={currentStep === 'type'}
        onConfirm={() => {
          if (value.current) {
            setData((prev) => ({ ...prev, type: value.current }));
            setCurrentStep('category');
          } else {
            Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
          }
        }}
      >
        <RadioButton
          gap={30}
          options={[
            { label: Label.income, value: Value.income },
            { label: Label.expense, value: Value.expense },
          ]}
          onSelecting={(selected) => (value.current = selected)}
        />
      </StepScreen>
    );
  };

  const CategoryStep = () => {
    const value = useRef<string>(data.category ? data.category : '');
    return (
      <StepScreen
        isVisible={currentStep === 'category'}
        onConfirm={() => {
          if (value.current) {
            setData((prev) => ({ ...prev, category: value.current }));
            setCurrentStep('startDate');
          } else {
            Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
          }
        }}
        onBack={() => {
          setCurrentStep('type');
          setData((prev) => ({ ...prev, category: value.current }));
        }}
      >
        <SearchDropdown
          initialValue={data.category}
          list={[
            'Supermercado',
            'Aluguel',
            'Fatura de Energia',
            'Fatura de Água',
            'Manga',
            'Pera',
            'Laranja',
          ]}
          label="Categoria"
          onSelect={(result) => (value.current = result)}
        />
      </StepScreen>
    );
  };

  const StartDateStep = () => {
    const value = useRef<string>(data.startDate ? data.startDate : '');
    return (
      <StepScreen
        isVisible={currentStep === 'startDate'}
        onConfirm={() => {
          if (value.current) {
            setData((prev) => ({ ...prev, startDate: value.current }));
            setCurrentStep('dueDate');
          } else {
            Alert.alert('Campo vazio', 'Digite uma data para continuar');
          }
        }}
        onBack={() => {
          setCurrentStep('category');
          setData((prev) => ({ ...prev, startDate: value.current }));
        }}
      >
        <DynamicLabelInput
          dateEntry
          initialText={data.startDate}
          label="Data de início"
          colorLabel={Colors.light.shadow}
          onTextChange={(date) => (value.current = date)}
        />
      </StepScreen>
    );
  };

  const DueDateStep = () => {
    const value = useRef<string>(data.dueDate ? data.dueDate : '');
    return (
      <StepScreen
        isVisible={currentStep === 'dueDate'}
        onConfirm={() => {
          if (value.current) {
            setData((prev) => ({ ...prev, dueDate: value.current }));
            setCurrentStep('totalValue');
          } else {
            Alert.alert('Campo vazio', 'Digite uma data para continuar');
          }
        }}
        onBack={() => {
          setCurrentStep('startDate');
          setData((prev) => ({ ...prev, dueDate: value.current }));
        }}
      >
        <DynamicLabelInput
          dateEntry
          initialText={data.dueDate}
          label="Data de vencimento"
          colorLabel={Colors.light.shadow}
          onTextChange={(date) => (value.current = date)}
        />
      </StepScreen>
    );
  };

  const TotalValueStep = () => {
    const value = useRef<number>(data.totalValue !== 0 ? data.totalValue : 0);
    return (
      <StepScreen
        isVisible={currentStep === 'totalValue'}
        onConfirm={() => {
          if (value.current) {
            setData((prev) => ({ ...prev, totalValue: value.current }));
            setCurrentStep('payment');
          } else {
            Alert.alert('Campo vazio', 'Digite um valor para continuar');
          }
        }}
        onBack={() => {
          setCurrentStep('dueDate');
          setData((prev) => ({ ...prev, totalValue: value.current }));
        }}
      >
        <DynamicLabelInput
          numberEntry
          initialNumber={data.totalValue}
          label="Valor"
          colorLabel={Colors.light.shadow}
          onNumberChange={(num) => (value.current = num)}
        />
      </StepScreen>
    );
  };

  const PaymentStep = () => {
    const value = useRef<boolean | null>(null);
    return (
      <StepScreen
        isVisible={currentStep === 'payment'}
        onConfirm={() => {
          if (value.current !== null) {
            setData((prev) => ({ ...prev, isPaid: value.current! }));
            Alert.alert('Finalizado!', JSON.stringify(data, null, 2));
          } else {
            Alert.alert('Nenhuma opção selecionada', 'Selecione uma opção para continuar');
          }
        }}
        onBack={() => {
          setCurrentStep('totalValue');
          setData((prev) => ({ ...prev, isPaid: value.current! }));
        }}
      >
        <RadioButton
          gap={30}
          options={[
            { label: 'O pagamento foi concluído', value: 'concluded' },
            { label: 'O pagamento está pendente', value: 'pending' },
          ]}
          onSelecting={(selected) => (value.current = selected === 'concluded')}
        />
      </StepScreen>
    );
  };

  return (
    <View style={styles.container}>
      <TypeStep />
      <CategoryStep />
      <StartDateStep />
      <DueDateStep />
      <TotalValueStep />
      <PaymentStep />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.shadow, justifyContent: 'center', alignItems: 'center' },
  content: { width: 300, backgroundColor: Colors.light.shadow, flexDirection: 'column', gap: 30, alignSelf: 'center' },
});
