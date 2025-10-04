import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Dropdown, { OpenDirection } from "..";
import LabelAnimated from "../../LabelAnimated";

interface Props {
  isVisible: boolean;
  setSelection: string | number;
  list: string[] | number[];
  placeholder: string;
  onOpeningDropdown: OpenDirection;
  onSelect: (item: string | number) => void;

}

export default function DropdownSelect({ isVisible, setSelection, list, placeholder, onOpeningDropdown, onSelect }: Props) {
  if (!isVisible) return null;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<string | number>(setSelection);

  return (
    <View style={styles.container}>

      <LabelAnimated
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        labelColor={'white'}
        labelText={placeholder}
        focused={false}
        textInput={selected}
      />
      
      <Pressable
        focusable
        style={styles.dropdownButton}
        onPress={() => setIsDropdownVisible((prev) => !prev)}
        onBlur={() => setIsDropdownVisible(false)}
        onFocus={() => setIsDropdownVisible(false)}
      >
        <Text style={styles.dropdownButtonText}>
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
  dropdownButton: {
    minWidth: 300, color: Colors.light.highlightBackgroun_1, borderWidth: 0.5, borderColor: Colors.light.highlightBackgroun_1,
    backgroundColor: "transparent", fontWeight: "bold", borderRadius: 10, padding: 14
  },
  dropdownButtonText: { fontSize: 16, color: "#333" }
});
