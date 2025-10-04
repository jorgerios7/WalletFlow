import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

interface Props { labelText: string, labelColor?: string, textInput: string | number, focused: boolean, onPress?: () => void }

export default function LabelAnimated({ labelText, labelColor, textInput, focused, onPress }: Props) {

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
            style={[styles.label, { top: labelPosition, backgroundColor: labelColor ? labelColor : Colors.light.background }]}
        >
            {labelText}
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    label: {
        left: 18, paddingHorizontal: 10, color: Colors.light.highlightBackgroun_1,
        zIndex: 2, fontSize: 12, fontWeight: 'bold', padding: 2, position: 'absolute'
    }
})