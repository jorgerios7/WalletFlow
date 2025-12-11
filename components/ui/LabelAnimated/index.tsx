import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext, useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

interface Props { labelText: string, labelColor?: string, textInput: string | number, focused: boolean, onPress?: () => void };

export default function LabelAnimated({labelText, labelColor, textInput, focused, onPress }: Props) {
    const { theme, fontSizeType } = useContext(ThemeContext);
    const labelPosition = useState(new Animated.Value(17))[0];

    useEffect(() => {
        const LABEL_TEXT_ABOVE = -9.6;
        const LABEL_TEXT_BELOW = 14

        Animated.timing(labelPosition, {
            toValue: textInput || focused ? LABEL_TEXT_ABOVE : LABEL_TEXT_BELOW,
            duration: 50,
            useNativeDriver: false,
        }).start();
    }, [textInput, focused]);

    return (
        <Animated.Text
            onPress={onPress}
            style={[styles.label, { 
                top: labelPosition, color: Colors[theme.appearance].textPrimary, 
                backgroundColor: labelColor ? labelColor : Colors[theme.appearance].surface, 
                fontSize: Typography[fontSizeType].xs.fontSize,
                lineHeight: Typography[fontSizeType].xs.lineHeight
            }]}
        >
            {labelText}
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    label: { left: 18, paddingHorizontal: 5, zIndex: 2, fontWeight: 'bold', padding: 2, position: 'absolute' }
})