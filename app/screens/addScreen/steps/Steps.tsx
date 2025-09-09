import { Payment } from "@/app/types/Finance";
import { LoadCategories } from "@/app/utils/categoryManager";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import RadioButton from "@/components/ui/RadioButton";
import SearchDropdown from "@/components/ui/searchDropdown";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Type } from "..";
import StepScreen from "../StepScreen";

export function CategoryStep(
  {
    isVisible, value, type, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean;
    value: string;
    type: Type;
    onConfirm: () => void;
    onBack: () => void;
    onSelect: (value: string) => void;
  }) {

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    HandleLoadCategories();
  }, []);

  async function HandleLoadCategories() {
    try {
      const data = await LoadCategories(type); // <- resolve a Promise
      setCategories(data);
    } catch (error) {
      console.log('(Steps.tsx) Erro ao carregar categoria: ', error);
    }
  }

  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
        }
      }}
      onBack={onBack}
    >
      <SearchDropdown
        initialValue={value}
        list={categories}
        label={"Categoria"}
        onSelect={onSelect}
        currentType={type}
        onAddCategory={() => HandleLoadCategories()}
      />
    </StepScreen>
  );
};

export function StartDateStep(
  {
    isVisible, value, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean;
    value: string;
    onSelect: (value: string) => void;
    onBack: () => void;
    onConfirm: () => void;
  }) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite uma data para continuar');
        }
      }}
      onBack={onBack}
    >
      <DynamicLabelInput
        dateEntry
        initialText={value}
        label={"Data de início"}
        colorLabel={Colors.light.shadow}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
};

export function DueDateStep(
  {
    isVisible, value, onSelect, onConfirm, onBack
  }: {
    isVisible: boolean;
    value: string;
    onSelect: (value: string) => void;
    onBack: () => void;
    onConfirm: () => void;
  }) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite uma data para continuar');
        }
      }}
      onBack={onBack}
    >
      <DynamicLabelInput
        dateEntry
        initialText={value}
        label={'Data de vencimento'}
        colorLabel={Colors.light.shadow}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
};

export function TotalValueStep(
  {
    isVisible, value, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean;
    value: number;
    onSelect: (value: number) => void;
    onBack: () => void;
    onConfirm: () => void;
  }) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite um valor para continuar');
        }
      }}
      onBack={onBack}
    >
      <DynamicLabelInput
        numberEntry
        initialNumber={value}
        label={'Valor total'}
        colorLabel={Colors.light.shadow}
        onNumberChange={onSelect}
      />
    </StepScreen>
  );
};

export function PaymentStep(
  {
    isVisible, value, onSelect, onBack, onConfirm
  }: {
    isVisible: boolean;
    value: string;
    onSelect: (value: string) => void;
    onBack: () => void;
    onConfirm: () => void;
  }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert('Nenhuma opção selecionada', 'Selecione uma opção para continuar');
        }
      }}
      onBack={onBack}
    >
      <RadioButton
        initialValue={value}
        gap={30}
        options={[
          { label: 'O pagamento está concluído', value: Payment.concluded },
          { label: 'O pagamento está pendente', value: Payment.pending },
        ]}
        onSelecting={onSelect}
      />
    </StepScreen>
  );
};