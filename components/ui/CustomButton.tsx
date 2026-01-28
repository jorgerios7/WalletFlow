import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomButton({ text, onPress }: { text: string, onPress?: () => void }) {
    const { preferences } = useContext(PreferencesContext);

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.button, {
                        backgroundColor: Colors[preferences.theme.appearance].accent, borderColor: Colors[preferences.theme.appearance].border,
                        outlineColor: Colors[preferences.theme.appearance].accentPressed
                    },
                    pressed && { backgroundColor: Colors[preferences.theme.appearance].accentPressed, }
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, {
                    color: Colors[preferences.theme.appearance].textContrast,
                    fontSize: Typography[preferences.fontSizeType].md.fontSize,
                    lineHeight: Typography[preferences.fontSizeType].md.lineHeight
                }]}
                >
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center' }, text: { fontWeight: 'bold' },
    button: { borderWidth: 0.5, borderRadius: 10, padding: 14, alignItems: 'center', justifyContent: 'center' }
});
