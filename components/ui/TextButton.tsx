import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from "react-native";

interface TextButtonProps {
    address?: string;
    text: string;
    adjustPaddingBottom: number;
    onPress?: () => void;
}

export default function TextButton({ address, text, onPress, adjustPaddingBottom }: TextButtonProps) {
    if (address) return (
        <Link href={address as any} asChild style={[styles.link, { marginBottom: adjustPaddingBottom }]}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Link>
    );

    return (
        <Pressable onPress={onPress}>
            <Text style={styles.text}>
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
        marginTop: 16,
        textAlign: 'center',
        color: Colors.light.background,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "transparent",
    },
});
