import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function PaymentDateStep(
    { isVisible, value, onSelect, onConfirm, onBack, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
    return (
        <StepScreen
            isVisible={isVisible}
            onBack={onBack}
            onConfirm={() => {
                if (value) {
                    onConfirm();
                } else {
                    Alert.alert('Campo vazio', 'Digite uma data para continuar');
                }
            }}
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