import { Payment, Type } from "@/app/types/Finance";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import RadioButton from "@/components/ui/RadioButton";
import SearchDropdown from "@/components/ui/SearchDropdown";
import { Colors } from "@/constants/Colors";
import { Alert } from "react-native";
import StepScreen from "../StepScreen";

export function TypeStep(
  {
    isVisible, value, onSelect, onConfirm
  }: {
    isVisible: boolean;
    value: string;
    onSelect: (value: string) => void;
    onConfirm: () => void
  }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (value) {
          onConfirm();
        } else {
          Alert.alert("Campo vazio", "Selecione uma opção para continuar");
        }
      }}
    >
      <RadioButton
        initialValue={value}
        gap={30}
        options={[
          { label: "Adicionar Receita Financeira", value: Type.income },
          { label: "Adicionar Despesa Financeira", value: Type.expense },
          { label: "Adicionar Lucro Financeiro", value: Type.profit },
        ]}
        onSelecting={(value) => onSelect(value)}
      />
    </StepScreen>
  );
}

export function CategoryStep(
  {
    isVisible, value, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean;
    value: string;
    onConfirm: () => void;
    onBack: () => void;
    onSelect: (value: string) => void;
  }) {
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
        list={[
          'Supermercado',
          'Aluguel',
          'Fatura de Energia',
          'Fatura de Água',
          'Manga',
          'Pera',
          'Laranja',
        ]}
        label={"Categoria"}
        onSelect={onSelect}
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