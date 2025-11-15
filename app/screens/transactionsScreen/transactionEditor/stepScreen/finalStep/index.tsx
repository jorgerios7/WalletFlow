import { Text, View } from "react-native";
import StepScreen from "..";

interface ConfirmationScreen { isVisible: boolean; textAbove: string, textBelow: string, onConfirm: () => void }

export default function FinalStep({ isVisible, textAbove, textBelow, onConfirm }: ConfirmationScreen) {
    if (!isVisible) return null;

    return (
        <StepScreen
            isVisible={isVisible}
            buttonTextConfirm={'Finalizar'}
            onConfirm={onConfirm}
            children={
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', textAlign: 'justify' }}>{textAbove}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'normal', textAlign: 'center' }}>{textBelow}</Text>
                </View>
            }
        />
    )
}