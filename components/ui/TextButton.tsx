import { ThemeType } from '@/app/types/appearance';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    theme: ThemeType, address?: string; text: string; onPress?: () => void; adjustPadding?: number;
    adjustMargin?: number; adjustPaddingBottom?: number; textColor?: string
}

export default function TextButton({
    theme, address, text, adjustPaddingBottom, adjustPadding, adjustMargin, textColor, onPress,
}: Props) {

    if (address) return (
        <Link href={address as any} asChild style={[styles.link, { marginBottom: adjustPaddingBottom }]}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Link>
    );

    const dynamicTextColor = { color: textColor ? textColor : Colors[theme].textPrimary };

    const dynamicAdjust = { padding: adjustPadding ? adjustPadding : 12, margin: adjustMargin ? adjustMargin : 0 };

    return (
        <Pressable
            style={[styles.button, dynamicAdjust, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].border }]}
            onPress={onPress}>
            <Text style={[styles.text, dynamicTextColor]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    link: { padding: 0.1 },
    text: { textAlign: 'center', alignSelf: 'center', fontSize: 16, fontWeight: "bold", backgroundColor: "transparent" },
    button: { width: '100%', alignSelf: 'center', backgroundColor: 'transparent', borderRadius: 10, borderWidth: 0.5 }
});
