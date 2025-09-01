import { MaskCurrency, MaskDate } from "@/app/utils/Format";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface LabelProps {
  initialText?: string,
  initialNumber?: number,
  label: string;
  colorLabel?: string;
  secureTextEntry?: boolean;
  numberEntry?: boolean;
  dateEntry?: boolean;
  onTextChange?: (text: string) => void;
  onNumberChange?: (number: number) => void;
}

export default function DynamicLabelInput({
  initialText,
  initialNumber,
  label,
  colorLabel,
  secureTextEntry,
  numberEntry,
  dateEntry,
  onTextChange,
  onNumberChange,
}: LabelProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(initialText ? initialText : "");
  const [number, setNumber] = useState(initialNumber ? initialNumber.toString() : "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const labelPosition = useState(new Animated.Value(17))[0];

  useEffect(() => {
    const LABEL_TEXT_ABOVE = -9.6;
    const LABEL_TEXT_BELOW = 14;

    Animated.timing(labelPosition, {
      toValue: text || number || isFocused ? LABEL_TEXT_ABOVE : LABEL_TEXT_BELOW,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [text, number, isFocused]);

  const handleValueChange = (newValue: string) => {
    console.log('newValue: ', newValue);
    if (!numberEntry) {
      setText(newValue);
      if (onTextChange) onTextChange(newValue);
    } else {
      setNumber(newValue);

      if (newValue.trim() === "") {
        if (onNumberChange) onNumberChange(0);
      } else {
        const onlyDigits = newValue.replace(/\D/g, "");
        setNumber(onlyDigits);

        const parsed = parseFloat(onlyDigits) / 100;
        if (!isNaN(parsed)) {
          onNumberChange?.(parsed);
        } else {
          onNumberChange?.(0);
        }
      }
    }
  };

  function LabelAnimated({
    labelText,
    labelColor,
  }: {
    labelText: string;
    labelColor?: string;
  }) {
    return (
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition,
            backgroundColor: labelColor ? labelColor : Colors.light.background,
          },
        ]}
      >
        {labelText}
      </Animated.Text>
    );
  }

  return (
    <View style={styles.container}>
      <LabelAnimated labelText={label} labelColor={colorLabel} />

      <TextInput
        value={
          numberEntry ?
            MaskCurrency(number)
            :
            dateEntry ?
              MaskDate(text)
              :
              text
        }
        onChangeText={(value) => handleValueChange(value)}
        style={[styles.input, isFocused && styles.inputFocused]}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        maxLength={dateEntry ? 10 : 40}
        keyboardType={numberEntry || dateEntry ? "numeric" : "default"}
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
            color={Colors.light.highlightBackgroun_1}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 18,
    paddingHorizontal: 10,
    color: Colors.light.highlightBackgroun_1,
    zIndex: 2,
    fontSize: 12,
    fontWeight: "bold",
    padding: 2,
  },
  input: {
    color: Colors.light.highlightBackgroun_1,
    borderWidth: 0.5,
    borderColor: Colors.light.highlightBackgroun_1,
    backgroundColor: "transparent",
    fontWeight: "bold",
    borderRadius: 10,
    padding: 14,
    zIndex: 0,
  },
  inputFocused: {
    outlineColor: "transparent",
  },
  eyeButton: {
    position: "absolute",
    right: 18,
    top: "55%",
    transform: [{ translateY: -12 }],
    outlineColor: "transparent",
  },
});
