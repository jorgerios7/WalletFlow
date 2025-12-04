import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

interface Props { theme: ThemeType, labelText: string, labelColor?: string, textInput: string | number, focused: boolean, onPress?: () => void };

export default function LabelAnimated({ theme, labelText, labelColor, textInput, focused, onPress }: Props) {

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
            style={[styles.label, { top: labelPosition, color: Colors[theme].textPrimary, backgroundColor: labelColor ? labelColor : Colors[theme].surface }]}
        >
            {labelText}
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    label: { left: 18, paddingHorizontal: 10, zIndex: 2, fontSize: 12, fontWeight: 'bold', padding: 2, position: 'absolute' }
})