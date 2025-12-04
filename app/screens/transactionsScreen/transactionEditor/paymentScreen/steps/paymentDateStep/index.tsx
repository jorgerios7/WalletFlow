import { ThemeType } from "@/app/types/appearance";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function PaymentDateStep(
    { isVisible, theme, value, onSelect, onConfirm, onBack, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
    return (
        <StepScreen
            isVisible={isVisible}
            theme={theme}
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
                theme={theme}
                initialText={value}
                label={'Data do pagamento'}
                onTextChange={onSelect}
            />
        </StepScreen>
    );
};