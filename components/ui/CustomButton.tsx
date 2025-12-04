import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomButton({ theme, text, textColor, onPress }: { theme: ThemeType, text: string, textColor?: string, onPress?: () => void }) {
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button, {
                        backgroundColor: Colors[theme].accent, borderColor: Colors[theme].border,
                        outlineColor: Colors[theme].accentPressed
                    },
                    pressed && { backgroundColor: Colors[theme].accentPressed, }
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, { color: Colors[theme].textContrast }]}>{text}</Text>
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
