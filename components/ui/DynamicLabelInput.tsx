import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface LabelProps {
    label: string;
    secureTextEntry?: boolean;
    value?: string;
    onTextChange?: (text: string) => void;
}

export default function DynamicLabelInput({ label, secureTextEntry, onTextChange }: LabelProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
    const labelPosition = useState(new Animated.Value(17))[0];

    useEffect(() => {
        const LABEL_TEXT_ABOVE = -9;
        const LABEL_TEXT_BELOW = 14

        Animated.timing(labelPosition, {
            toValue: text || isFocused ? LABEL_TEXT_ABOVE : LABEL_TEXT_BELOW,
            duration: 50,
            useNativeDriver: false,
        }).start();
    }, [text, isFocused]);

    const handleTextChange = (newText: string) => {
        setText(newText);
        if (onTextChange) {
            onTextChange(newText);
        }
    };

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.label,
                    { top: labelPosition },
                ]}
            >
                {label}
            </Animated.Text>
            <TextInput
                onChangeText={handleTextChange}
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                ]}
                secureTextEntry={!isPasswordVisible}

                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeButton}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={18}
                        color={Colors.light.background}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginBottom: 16,
    },
    label: {
        position: 'absolute',
        left: 18,
        backgroundColor: Colors.light.highlightBackgroun_1,
        paddingHorizontal: 10,
        color: 'white',
        zIndex: 2,
        fontSize: 12,
        fontWeight: 'bold',
        padding: 2,
        
    },
    input: {
        color: Colors.light.background,
        borderWidth: 0.5,
        borderColor: Colors.light.border,
        backgroundColor: 'transparent', 
        borderRadius: 3,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 14,
        zIndex: 0, 
    },
    inputFocused: {
        outlineColor: Colors.light.background,
    },
    eyeButton: {
        position: "absolute",
        right: 18,
        top: "55%",
        transform: [{ translateY: -12 }],
        outlineColor: "transparent",
    },
});