import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import StepScreen from "..";

interface ConfirmationScreen { isVisible: boolean; theme: ThemeType; textAbove: string, textBelow: string, onConfirm: () => void }

export default function FinalStep({ isVisible, theme, textAbove, textBelow, onConfirm }: ConfirmationScreen) {
    if (!isVisible) return null;

    return (
        <StepScreen
            isVisible={isVisible}
            theme={theme}
            buttonTextConfirm={'Finalizar'}
            onConfirm={onConfirm}
            children={
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text style={{ color: Colors[theme].textPrimary , fontSize: 16, fontWeight: 'normal', textAlign: 'justify' }}>{textAbove}</Text>
                    <Text style={{ color: Colors[theme].textSecondary, fontSize: 16, fontWeight: 'normal', textAlign: 'center' }}>{textBelow}</Text>
                </View>
            }
        />
    )
}