import { ThemeType } from "@/app/types/appearance";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Dropdown, { OpenDirection } from "..";
import LabelAnimated from "../../LabelAnimated";

interface Props {
  theme: ThemeType, isVisible: boolean; setSelection: string | number; list: string[] | number[];
  placeholder: string; onOpeningDropdown: OpenDirection; onSelect: (item: string | number) => void;
};

export default function DropdownSelect({ theme, isVisible, setSelection, list, placeholder, onOpeningDropdown, onSelect }: Props) {
  if (!isVisible) return null;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<string | number>(setSelection);

  return (
    <View style={[styles.container, { backgroundColor: '' }]}>
      <LabelAnimated
        theme={theme}
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        labelText={placeholder}
        focused={false}
        textInput={selected}
      />

      <Pressable
        focusable
        style={[styles.dropdownButton, { borderColor: Colors[theme].borderInverse }]}
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        onBlur={() => setIsDropdownVisible(false)}
        onFocus={() => setIsDropdownVisible(false)}
      >
        <Text style={[styles.dropdownButtonText, { color: Colors[theme].textPrimary }]}>
          {selected}
        </Text>
      </Pressable>

      <Dropdown
        theme={theme}
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
