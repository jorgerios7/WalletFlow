import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface CustomHeaderProps {
    text1: string;
    text2: string;
    addPaddingVertical?: number;
    addPaddingBottom?: number;
    addMarginBottom?: number;
}

export default function WordMark({ text1, text2, addPaddingVertical, addPaddingBottom, addMarginBottom }: CustomHeaderProps) {
    return (
        <View style={[styles.header, { paddingVertical: addPaddingVertical }, { paddingVertical: addPaddingBottom }, { paddingVertical: addMarginBottom }]}>
            <Text style={styles.logoText}>
                {text1}
                <Text style={{ color: "pink" }}>
                    {text2}
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
    },

    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.background,
    },
});