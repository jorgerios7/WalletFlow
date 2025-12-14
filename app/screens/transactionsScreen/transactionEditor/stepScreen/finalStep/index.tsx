import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Text, View } from "react-native";
import StepScreen from "..";

interface ConfirmationScreen { isVisible: boolean; textAbove: string, textBelow: string, onConfirm: () => void }

export default function FinalStep({ isVisible, textAbove, textBelow, onConfirm }: ConfirmationScreen) {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    return (
        <StepScreen
            isVisible={isVisible}
            buttonTextConfirm={'Finalizar'}
            onConfirm={onConfirm}
            children={
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textPrimary, fontWeight: 'normal', textAlign: 'justify',
                            fontSize: Typography[preferences.fontSizeType].md.fontSize, lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                        }}
                    >
                        {textAbove}
                    </Text>

                    <Text
                        style={{
                            color: Colors[preferences.theme.appearance].textSecondary, fontWeight: 'normal', textAlign: 'center',
                            fontSize: Typography[preferences.fontSizeType].md.fontSize, lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                        }}
                    >
                        {textBelow}
                    </Text>
                </View>
            }
        />
    )
}