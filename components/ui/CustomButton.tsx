import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";

export default function CustomButton({ text, onPress }: { text: string, onPress?: () => void }) {
    const { theme, fontSizeType } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button, {
                        backgroundColor: Colors[theme.appearance].accent, borderColor: Colors[theme.appearance].border,
                        outlineColor: Colors[theme.appearance].accentPressed
                    },
                    pressed && { backgroundColor: Colors[theme.appearance].accentPressed, }
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, {
                    color: Colors[theme.appearance].textContrast,
                    fontSize: Typography[fontSizeType].md.fontSize,
                    lineHeight: Typography[fontSizeType].md.lineHeight
                }]}
                >
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { justifyContent: 'center' }, text: { fontSize: 14, fontWeight: 'bold' },
    button: {
        borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 14,
        paddingVertical: 14, alignItems: 'center', justifyContent: 'center'
    }
});
