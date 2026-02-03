import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { View } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props {
    visible: boolean;
    value: number;
    step: { total: number, current: number }
    onSelect: (value: number) => void;
    onConfirm: () => void;
    onBack: () => void;
    onCancel: () => void;
}

export default function PaymentValueStep({ visible, value, step, onSelect, onConfirm, onBack, onCancel }: Props) {

    function handleEmptyField() {
        if (value !== 0) {
            onConfirm();
        }
    }

    return (
        <StepScreen
            isVisible={visible}
            step={step}
            title="Editar valor"
            onConfirm={handleEmptyField}
            onBack={onBack}
            onCancel={onBack}
        >
            <View>
                <DynamicLabelInput
                    numberEntry
                    initialNumber={value}
                    label="Valor"
                    onNumberChange={onSelect}
                />
            </View>
        </StepScreen>
    );
}