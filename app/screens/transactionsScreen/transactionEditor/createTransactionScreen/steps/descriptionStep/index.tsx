import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function DescriptionStep(
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
                label={"Descrição (opcional)"}
                onTextChange={onSelect}
            />
        </StepScreen>
    );
}