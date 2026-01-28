import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    address?: string; text: string; adjustMargin?: number; adjustPaddingBottom?: number;
    textColor?: string, onPress?: () => void; adjustPadding?: number
}

export default function TextButton({
    address, text, adjustPaddingBottom, adjustPadding, adjustMargin, textColor, onPress,
}: Props) {

    const { preferences } = useContext(PreferencesContext);
    

    const dynamicTextColor = {
        color: textColor
            ? textColor
            : Colors[preferences.theme.appearance].textPrimary
    };
    const dynamicAdjust = {
        padding: adjustPadding
            ? adjustPadding
            : 12,
        margin: adjustMargin
            ? adjustMargin
            : 0
    };

    if (address) return (
        <Link href={address as any} asChild style={[styles.link, { marginBottom: adjustPaddingBottom }]}>
            <Text style={[styles.text, dynamicTextColor]}>
                {text}
            </Text>
        </Link>
    );

    return (
        <Pressable
            style={[styles.button, dynamicAdjust]}
            onPress={onPress}>
            <Text style={[styles.text, dynamicTextColor]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    link: { padding: 0.1 },
    text: { textAlign: 'center', alignSelf: 'center', fontSize: 16, fontWeight: "bold"},
    button: { flexGrow: 1, alignSelf: 'center', backgroundColor: 'transparent' }
});
