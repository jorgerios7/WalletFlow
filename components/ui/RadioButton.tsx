import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Option = {
    label: string;
    value: string;
};

export default function RadioButton({
    isHorizontal, gap, options, initialValue, onSelecting
}: {
    isHorizontal?: boolean, gap?: number, options: Option[], initialValue: string, onSelecting: (option: string) => void
}) {
    const [selectedButton, setSelectedButton] = useState<string>(initialValue ? initialValue : "");

    function handleAction(value: string) {
        setSelectedButton(value);
        onSelecting(value);
    }

    return (
        <View style={[styles.container, { flexDirection: isHorizontal ? 'row' : 'column', gap: gap ? gap : 20 }]}>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    style={styles.radioContainer}
                    onPress={() => handleAction(option.value)}
                >
                    <View style={styles.radioCircle}>
                        {selectedButton === option.value && <View style={styles.selectedDot} />}
                    </View>
                    <Text>{option.label}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        //backgroundColor: 'blue'
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.light.highlightBackgroun_1,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.light.highlightBackgroun_2
    },
});
