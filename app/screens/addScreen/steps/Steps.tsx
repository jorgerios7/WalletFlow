import { Payment, RecurrenceType } from "@/app/types/Finance";
import { LoadCategories } from "@/app/utils/categoryManager";
import SearchDropdown from "@/components/ui/dropdowns/dropdownSearch.tsx";
import DeleteCategoryMenu from "@/components/ui/dropdowns/dropdownSearch.tsx/deleteCategoryMenu";
import NewCategoryMenu from "@/components/ui/dropdowns/dropdownSearch.tsx/newCategoryMenu";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import RadioButton from "@/components/ui/RadioButton";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Type } from "..";
import StepScreen from "../StepScreen";

export function RecurrenceScreen(
  {
    isVisible, initialValue, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean; initialValue: RecurrenceType; onConfirm: () => void; onBack: () => void;
    onSelect: (recurrenceType: RecurrenceType, installmentNumber: number) => void;
  }) {
  if (!isVisible) return;

  const [selection, setSelection] = useState({ recurrenceType: initialValue, installmentNumber: 2 });

  useEffect(() => {
    if (!initialValue) setSelection((prev) => ({ ...prev, recurrenceType: initialValue }));
  }, [initialValue]);

  useEffect(() => {
    handleSelect();
  }, [selection]);

  function handleSelect() {
    if (selection.recurrenceType === 'installment') {
      onSelect(selection.recurrenceType, selection.installmentNumber)
    } else {
      onSelect(selection.recurrenceType, 0);
    }
  }

  return (
    
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => {
        if (selection) {
          onConfirm();
        } else {
          Alert.alert('Campo vazio', 'Digite uma data para continuar');
        }
      }}
      onBack={onBack}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5 }}>

        <DropdownSelect
          isVisible
          onOpeningDropdown="openAtBottom"
          placeholder={'Recorrência'}
          setSelection={initialValue}
          list={['single', 'fixed', 'installment']}
          onSelect={(item) => {
            setSelection((prev) => ({ ...prev, recurrenceType: item as RecurrenceType }))
          }}
        />
      </View>

      {selection.recurrenceType === 'installment' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <DropdownSelect
            isVisible
            onOpeningDropdown="openAtBottom"
            placeholder={'Quantidade de parcelas'}
            setSelection={2}
            list={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onSelect={(value) => {
              setSelection((prev) => ({ ...prev, installmentNumber: value as number }))
            }}
          />
        </View>)}
    </StepScreen>
  );
}

export function CategoryStep(
  {
    isVisible, initialValue, type, onConfirm, onBack, onSelect
  }: {
    isVisible: boolean;
    initialValue: string;
    type: Type;
    onConfirm: () => void;
    onBack: () => void;
    onSelect: (value: string) => void;
  }) {
  const [itemsVisible, setItemsVisible] = useState({ newCategoryMenu: false, deleteCategoryMenu: false });
  const [categories, setCategories] = useState<string[]>([]);
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    HandleLoadCategories();
  }, []);

  async function HandleLoadCategories() {
    try {
      const data = await LoadCategories(type);
      setCategories(data);
    } catch (error) {
      console.log('(Steps.tsx) Erro ao carregar categoria: ', error);
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <StepScreen
        isVisible={isVisible}
        onConfirm={() => {
          if (text === '' || !text || text !== initialValue) {
            Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
          } else {
            onConfirm();
          }
        }}
        onBack={onBack}
      >
        <SearchDropdown
          initialValue={initialValue}
          onOpeningDropdown="openAtBottom"
          list={categories}
          label={"Categoria"}
          menuVisibility={(menu) => setItemsVisible(prev => ({ ...prev, [menu]: true }))}
          onSelectInDropdown={(text1) => { onSelect(text1), setText(text1) }}
          whenSelectItemToAdd={(text1) => { onSelect(text1); setText(text1) }}
          whenSelectItemToDelete={(text1) => { onSelect(text1), setText(text1) }}
          onTextInputChange={(text1) => setText(text1)}
        />
      </StepScreen>

      <NewCategoryMenu
        isVisible={itemsVisible.newCategoryMenu}
        categoryToAdd={text}
        currentType={type}
        onSuccess={() => { HandleLoadCategories() }}
        onDismiss={() => setItemsVisible(prev => ({ ...prev, newCategoryMenu: false }))}
      />

      <DeleteCategoryMenu
        isVisible={itemsVisible.deleteCategoryMenu}
        currentType={type}
        categoryToDelete={text}
        onSuccess={() => { HandleLoadCategories() }}
        onDismiss={() => setItemsVisible(prev => ({ ...prev, deleteCategoryMenu: false }))}
      />
    </View>
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

export function PaymentDateStep(
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
        label={'Data do pagamento'}
        colorLabel={Colors.light.shadow}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
};

export function MethodStep(
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
      <DropdownSelect
        isVisible
        onOpeningDropdown="openAtBottom"
        placeholder={'asas'}
        setSelection={value}
        list={['']}
        onSelect={(value) => onSelect(value as string)}
      />
    </StepScreen>
  );
};