import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { MaskCurrency, MaskDate } from "@/app/utils/Format";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface Props {
  initialText?: string, initialNumber?: number, label: string; colorLabel?: string; secureTextEntry?: boolean;
  numberEntry?: boolean; dateEntry?: boolean; onTextChange?: (text: string) => void; onNumberChange?: (number: number) => void;
}

export default function DynamicLabelInput({
  initialText, initialNumber, label, colorLabel, secureTextEntry,
  numberEntry, dateEntry, onTextChange, onNumberChange,
}: Props) {
  const { preferences } = useContext(PreferencesContext);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(initialText ? initialText : "");
  const [number, setNumber] = useState(initialNumber ? initialNumber.toString() : "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const theme = Colors[preferences.theme.appearance];
  const typography = Typography[preferences.fontSizeType];

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
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border, }]}>
      <TextInput
        value={numberEntry ? MaskCurrency(number) : dateEntry ? MaskDate(text) : text}
        placeholder={label}
        placeholderTextColor={theme.textSecondary}
        onChangeText={(value) => handleValueChange(value)}
        style={[
          [
            styles.input, {
              color: theme.textPrimary,
              fontSize: typography.md.fontSize,
              lineHeight: typography.md.lineHeight
            }],
          isFocused && [styles.inputFocused, {borderColor: theme.accent, }]
        ]}
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
            color={theme.iconPrimary}
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
            color={theme.iconPrimary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, position: "relative", borderWidth: 0.5, borderRadius: 10 },
  input: { backgroundColor: "transparent", fontWeight: "bold" , padding: 14 },
  inputFocused: { outlineColor: "transparent", borderWidth: 1, borderRadius: 10 },
  imageButton: { position: "absolute", right: 18, top: "55%", transform: [{ translateY: -12 }], outlineColor: "transparent" },
});
