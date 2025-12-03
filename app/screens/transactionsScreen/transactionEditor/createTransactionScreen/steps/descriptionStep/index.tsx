import { ThemeType } from "@/app/types/appearance";
import DynamicLabelInput from "@/components/ui/DynamicLabelInput";
import { Colors } from "@/constants/Colors";
import StepScreen from "../../../stepScreen";

interface StepsProps { isVisible: boolean; theme: ThemeType, onBack?: () => void; onConfirm: () => void; onCancel: () => void }

export default function DescriptionStep(
    { isVisible, theme, value, onConfirm, onBack, onSelect, onCancel }: StepsProps & { value: string; onSelect: (value: string) => void }
) {
    return (
        <StepScreen
            theme={theme}
            isVisible={isVisible}
            onConfirm={() => { onConfirm() }}
            onBack={onBack}
            onCancel={onCancel}
        >
            <DynamicLabelInput
                theme={theme}
                initialText={value}
                label={"Descrição (opcional)"}
                colorLabel={Colors.light.background}
                onTextChange={onSelect}
            />
        </StepScreen>
    );
}