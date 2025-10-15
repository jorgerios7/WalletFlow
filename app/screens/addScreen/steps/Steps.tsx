import { RecurrenceType, TransactionType } from "@/app/types/Finance";
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
import StepScreen from "../StepScreen";

interface StepsProps {
  isVisible: boolean; onBack: () => void; onConfirm: () => void; onCancel: () => void;
}

export function RecurrenceScreen(
  {
    isVisible, value, onConfirm, onCancel, onSelect
  }: StepsProps & { value: RecurrenceType; onSelect: (recurrenceType: RecurrenceType, totalEntries: number) => void }
) {
  if (!isVisible) return;

  const [selection, setSelection] = useState({ recurrenceType: value, totalEntries: 2 });

  useEffect(() => {
    if (!value) setSelection((prev) => ({ ...prev, recurrenceType: value }));
  }, [value]);

  useEffect(() => {
    handleSelect();
  }, [selection]);

  function handleSelect() {
    if (selection.recurrenceType === 'installment') {
      onSelect(selection.recurrenceType, selection.totalEntries)
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
      onCancel={onCancel}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>

        <DropdownSelect
          isVisible
          onOpeningDropdown="openAtBottom"
          placeholder={'Recorrência'}
          setSelection={value}
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
              setSelection((prev) => ({ ...prev, totalEntries: value as number }))
            }}
          />
        </View>
      )}
    </StepScreen>
  );
}

export function CategoryStep(
  { isVisible, value, type, onConfirm, onBack, onSelect, onCancel }:
    StepsProps & { value: string; type: TransactionType; onSelect: (value: string) => void }
) {
  const [itemsVisible, setItemsVisible] = useState({ newCategoryMenu: false, deleteCategoryMenu: false });
  const [categories, setCategories] = useState<string[]>([]);
  const [text, setText] = useState(value);

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
          if (text === '' || !text || text !== value) {
            Alert.alert('Campo vazio', 'Selecione uma opção para continuar');
          } else {
            onConfirm();
          }
        }}
        onBack={onBack}
        onCancel={onCancel}
      >
        <SearchDropdown
          initialValue={value}
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
  { isVisible, value, onConfirm, onBack, onSelect, onCancel }:
    StepsProps & { value: string; onSelect: (value: string) => void }
) {
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
      onCancel={onCancel}
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
  { isVisible, value, onSelect, onConfirm, onBack, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void; }
) {
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
      onCancel={onCancel}
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
  { isVisible, value, onConfirm, onBack, onSelect, onCancel }: StepsProps & { value: number; onSelect: (value: number) => void }
) {
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
      onCancel={onCancel}
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
  { isVisible, value, onSelect, onBack, onConfirm, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
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
      onCancel={onCancel}
    >
      <RadioButton
        initialValue={value}
        gap={30}
        options={[
          { label: 'O pagamento está concluído', value: 'concluded' },
          { label: 'O pagamento está pendente', value: 'pending'},
        ]}
        onSelecting={onSelect}
      />
    </StepScreen>
  );
};

export function DescriptionStep(
  { isVisible, value, onConfirm, onBack, onSelect, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
  return (
    <StepScreen
      isVisible={isVisible}
      onConfirm={() => { onConfirm() }}
      onBack={onBack}
      onCancel={onCancel}
    >
      <DynamicLabelInput
        initialText={value}
        label={"Descrição"}
        colorLabel={Colors.light.shadow}
        onTextChange={onSelect}
      />
    </StepScreen>
  );
}

export function PaymentDateStep(
  { isVisible, value, onSelect, onConfirm, onBack, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
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
      onCancel={onCancel}
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
  { isVisible, value, onConfirm, onBack, onSelect, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
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
      onCancel={onCancel}
    >
      <DropdownSelect
        isVisible
        onOpeningDropdown="openAtBottom"
        placeholder={'Método de pagamento'}
        setSelection={value}
        list={['Cartão de crédito', 'Cartão de débito', 'Pix', 'Dinheiro', 'Boleto', 'Transferência bancária']}
        onSelect={(value) => onSelect(value as string)}
      />
    </StepScreen>
  );
};