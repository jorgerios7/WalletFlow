import { RecurrenceFrequency } from "@/app/types/Finance";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Colors } from "@/constants/Colors";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
  isVisible: boolean; startDate: string, recurrenceType: string, recurrenceFrequency: RecurrenceFrequency, value: string;
  onSelect: (value: string) => void; onBack?: () => void; onConfirm: () => void; onCancel: () => void;
}

export default function DueDateStep(
  { isVisible, startDate, recurrenceType, recurrenceFrequency, value, onSelect, onConfirm, onBack, onCancel }: Props
) {

  function handleDate(preSelect: boolean, dueDay: string) {
    const parts = (preSelect ? value : startDate).split("/");

    if (preSelect) {
      return parts[0];
    } else {
      onSelect(`${dueDay}/${parts[1]}/${parts[2]}`)
      return ('');
    }
  }

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
      {recurrenceType === 'installment' ? (
        <DropdownSelect
          isVisible
          onOpeningDropdown="openAtBottom"
          placeholder={recurrenceFrequency === "weekly"
            ? "Vencerá sempre neste dia de cada semana"
            : "Vencerá sempre neste dia de cada mês"
          }
          setSelection={handleDate(true, value)}
          list={recurrenceFrequency === "weekly"
            ? ['01', '02', '03', '04', '05', '06', '07']
            : [
              '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
              '16', '17', '18', '19', '20', '21', '22', '23', '25', '26', '27', '28', '29', '30', '31'
            ]}
          onSelect={(day) => handleDate(false, day as string)}
        />
      ) : (
        <DynamicLabelInput
          dateEntry
          initialText={value}
          label={'Data do vencimento'}
          colorLabel={Colors.light.background}
          onTextChange={onSelect}
        />
      )}
    </StepScreen>
  );
};