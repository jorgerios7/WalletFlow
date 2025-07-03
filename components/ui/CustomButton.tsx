import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
    text?: string;
    onPress?: () => void;
}

export default function CustomButton({ text, onPress }: ButtonProps) {
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colors.light.background,
        borderWidth: 0.5,
        borderColor: Colors.light.tint,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        outlineColor: Colors.light.background,

    },
    buttonPressed: {
        backgroundColor: Colors.light.tabIconDefault,
    },
    buttonText: {
        color: Colors.light.tint,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
