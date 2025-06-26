import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { StyleSheet, Text } from "react-native";

interface TextButtonProps {
    address: string;
    text: string;
    adjustPaddingBottom: number;
}

export default function TextButton({ address, text, adjustPaddingBottom }: TextButtonProps) {
    return (
        <Link href={address as any} asChild style={[styles.link, { marginBottom: adjustPaddingBottom }]}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Link>
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
