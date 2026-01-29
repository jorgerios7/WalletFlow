import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
    value: string;
    isVisible: boolean;
    step: { total: number, current: number }
    onSelect: (value: string) => void;
    onBack?: () => void;
    onConfirm: () => void;
    onCancel: () => void
}

export default function PaymentDateStep({ isVisible, value, step, onSelect, onConfirm, onBack, onCancel }: Props) {

    function handleEmptyField() {
        if (value) {
            onConfirm();
        } else {
            Alert.alert('Campo vazio', 'Digite uma data para continuar');
        }
    }

    return (
        <StepScreen
            isVisible={isVisible}
            step={step}
            title={"Editar transação"}
            onBack={onBack}
            onConfirm={handleEmptyField}
            onCancel={onCancel}
        >
            <DynamicLabelInput
                dateEntry
                initialText={value}
                label={'Data do pagamento'}
                onTextChange={onSelect}
            />
        </StepScreen>
    );
};