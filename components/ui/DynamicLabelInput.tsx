import { MaskCurrency, MaskDate } from "@/app/utils/Format";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemeContext } from "../ThemeProvider";
import LabelAnimated from "./LabelAnimated";

interface Props {
  initialText?: string, initialNumber?: number, label: string; colorLabel?: string; secureTextEntry?: boolean;
  numberEntry?: boolean; dateEntry?: boolean; onTextChange?: (text: string) => void; onNumberChange?: (number: number) => void;
}

export default function DynamicLabelInput({
  initialText, initialNumber, label, colorLabel, secureTextEntry,
  numberEntry, dateEntry, onTextChange, onNumberChange,
}: Props) {
  const { theme, fontSizeType } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(initialText ? initialText : "");
  const [number, setNumber] = useState(initialNumber ? initialNumber.toString() : "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleValueChange = (newValue: string) => {
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

  return (
    <View style={styles.container}>
      <LabelAnimated
        labelText={label}
        labelColor={colorLabel}
        focused={isFocused}
        textInput={text ? text : number}
      />

      <TextInput
        value={numberEntry ? MaskCurrency(number) : dateEntry ? MaskDate(text) : text}
        onChangeText={(value) => handleValueChange(value)}
        style={[[styles.input, {
          borderColor: Colors[theme.appearance].borderInverse, color: Colors[theme.appearance].textPrimary,
          fontSize: Typography[fontSizeType].md.fontSize,
          lineHeight: Typography[fontSizeType].md.lineHeight
        }], isFocused && styles.inputFocused]}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        maxLength={dateEntry ? 10 : 40}
        keyboardType={numberEntry || dateEntry ? "numeric" : "default"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secureTextEntry && (
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.imageButton}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={18}
            color={Colors[theme.appearance].iconPrimary}
          />
        </Pressable>
      )}

      {dateEntry && (
        <Pressable
          onPress={() => setIsCalendarVisible(true)}
          style={styles.imageButton}
        >
          <Ionicons
            name={"calendar"}
            size={18}
            color={Colors[theme.appearance].iconPrimary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative" },
  input: { borderWidth: 0.5, backgroundColor: "transparent", fontWeight: "bold", borderRadius: 10, padding: 14 },
  inputFocused: { outlineColor: "transparent" },
  imageButton: { position: "absolute", right: 18, top: "55%", transform: [{ translateY: -12 }], outlineColor: "transparent" },
});
