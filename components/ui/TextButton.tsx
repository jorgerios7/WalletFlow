import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from "react-native";

interface TextButtonProps {
    address?: string;
    text: string;
    onPress?: () => void;
    adjustPadding?: number;
    adjustMargin?: number;
    adjustPaddingBottom?: number;
    textColor?: string
}

export default function TextButton({
    address,
    text,
    onPress,
    adjustPaddingBottom,
    adjustPadding,
    adjustMargin,
    textColor
}: TextButtonProps) {
    if (address) return (
        <Link href={address as any} asChild style={[styles.link, { marginBottom: adjustPaddingBottom }]}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Link>
    );

    const dynamicTextColor = {
        color: textColor ? textColor : Colors.light.highlightBackgroun_1
    };

    return (
        <Pressable style={[styles.button, { padding: adjustPadding, margin: adjustMargin }]} onPress={onPress}>
            <Text style={[styles.text, dynamicTextColor]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    link: {
        padding: 0.1,
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "transparent",
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
    }
});
