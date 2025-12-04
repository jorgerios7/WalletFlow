import { ThemeType } from '@/app/types/appearance';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    theme: ThemeType, address?: string; text: string; adjustMargin?: number; adjustPaddingBottom?: number;
    textColor?: string, onPress?: () => void; adjustPadding?: number
}

export default function TextButton({
    theme, address, text, adjustPaddingBottom, adjustPadding, adjustMargin, textColor, onPress,
}: Props) {

    const dynamicTextColor = {
        color: textColor
            ? textColor
            : Colors[theme].primary
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
    button: { width: '100%', alignSelf: 'center', backgroundColor: 'transparent' }
});
