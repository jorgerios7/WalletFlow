import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import StepScreen from "../../../stepScreen";

interface Props {
    isVisible: boolean;
    value: string;
    onBack?: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    onSelect: (value: string) => void
}

export default function DescriptionStep({ isVisible, value, onConfirm, onBack, onSelect, onCancel }: Props) {
    return (
        <StepScreen
            isVisible={isVisible}
            onConfirm={onConfirm}
            onBack={onBack}
            onCancel={onCancel}
        >
            <DynamicLabelInput
                initialText={value}
                label={"Descrição (opcional)"}
                onTextChange={onSelect}
            />
        </StepScreen>
    );
}