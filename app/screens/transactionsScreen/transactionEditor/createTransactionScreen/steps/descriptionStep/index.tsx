import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import StepScreen from "../../../stepScreen";

interface Props {
    isVisible: boolean;
    value: string;
    step: { total: number, current: number }
    onBack?: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    onSelect: (value: string) => void
}

export default function DescriptionStep({ isVisible, value, step, onConfirm, onBack, onSelect, onCancel }: Props) {
    return (
        <StepScreen
            isVisible={isVisible}
            title={"Cadastrar receita ou despesa?"}
            step={step}
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