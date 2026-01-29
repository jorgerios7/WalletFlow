import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { Text, View } from "react-native";
import StepScreen from "..";

interface Props {
    isVisible: boolean;
    title: string;
    textAbove: string,
    textBelow: string,
    onConfirm: () => void
}

export default function FinalStep({ isVisible, title, textAbove, textBelow, onConfirm }: Props) {
    if (!isVisible) return null;

    const { preferences } = useContext(PreferencesContext);

    return (
        <StepScreen
            isVisible={isVisible}
            title={title}
            buttonTextConfirm={'Finalizar'}
            onConfirm={onConfirm}
            children={
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text
                        style={{
                            fontWeight: 'normal',
                            textAlign: 'justify',
                            color: Colors[preferences.theme.appearance].textPrimary,
                            fontSize: Typography[preferences.fontSizeType].md.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                        }}
                    >
                        {textAbove}
                    </Text>

                    <Text
                        style={{
                            fontWeight: 'normal',
                            textAlign: 'center',
                            color: Colors[preferences.theme.appearance].textSecondary,
                            fontSize: Typography[preferences.fontSizeType].md.fontSize,
                            lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                        }}
                    >
                        {textBelow}
                    </Text>
                </View>
            }
        />
    )
}