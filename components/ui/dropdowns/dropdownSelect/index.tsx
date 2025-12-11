import { ThemeContext } from "@/components/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Dropdown, { OpenDirection } from "..";
import LabelAnimated from "../../LabelAnimated";

interface Props {
  isVisible: boolean; setSelection: string | number; list: string[] | number[];
  placeholder: string; onOpeningDropdown: OpenDirection; onSelect: (item: string | number) => void;
};

export default function DropdownSelect({ isVisible, setSelection, list, placeholder, onOpeningDropdown, onSelect }: Props) {
  if (!isVisible) return null;

  const { theme, fontSizeType } = useContext(ThemeContext);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<string | number>(setSelection);

  return (
    <View style={[styles.container, { backgroundColor: '' }]}>
      <LabelAnimated
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        labelText={placeholder}
        focused={false}
        textInput={selected}
      />

      <Pressable
        focusable
        style={[styles.dropdownButton, { borderColor: Colors[theme.appearance].borderInverse }]}
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        onBlur={() => setIsDropdownVisible(false)}
        onFocus={() => setIsDropdownVisible(false)}
      >
        <Text style={[styles.dropdownButtonText, {
          color: Colors[theme.appearance].textPrimary, 
          fontSize: Typography[fontSizeType].md.fontSize,
          lineHeight: Typography[fontSizeType].md.lineHeight
        }]}
        >
          {selected}
        </Text>
      </Pressable>

      <Dropdown
        isVisible={isDropdownVisible}
        onShowing={onOpeningDropdown}
        items={list}
        onSelect={(item) => {
          setSelected(item);
          setIsDropdownVisible(false);
          onSelect(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "relative" }, // importante pra referência do absolute
  dropdownButton: { minWidth: 300, borderWidth: 0.5, backgroundColor: "transparent", fontWeight: "bold", borderRadius: 10, padding: 14 },
  dropdownButtonText: { fontSize: 16 }
});
