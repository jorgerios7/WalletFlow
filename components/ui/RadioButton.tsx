import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Option = {
    label: string;
    value: string;
};

export default function RadioButton({
    options, onSelecting
}: {
    options: Option[], onSelecting: (option: string) => void
}) {
    const [selected, setSelected] = useState<string>("");

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    style={styles.radioContainer}
                    onPress={() => {
                        setSelected(option.value);
                        onSelecting(option.value)
                    }}
                >
                    <View style={styles.radioCircle}>
                        {selected === option.value && <View style={styles.selectedDot} />}
                    </View>
                    <Text>{option.label}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 20
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
        borderColor: "#444",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#444",
    },
});
