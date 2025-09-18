import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  isVisible: boolean;
  setSelection: string;
  options: string[];
  placeholder?: string;
  onSelect: (item: string) => void;
}

const DropdownMenu: React.FC<Props> = ({ isVisible, setSelection, options, placeholder, onSelect }) => {
  if (!isVisible) return null;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selected, setSelected] = useState(setSelection);

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsDropdownVisible(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.dropdownButtonText}>
          {selected || placeholder}
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};


export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    position: "relative", // importante pra referência do absolute
  },
  dropdownButton: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    minWidth: 100,
    position: "absolute",
    top: "100%", // logo abaixo do botão
    left: 0,
    right: 0,
    zIndex: 999, // fica acima de outros elementos
    marginTop: 2,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    maxHeight: 150,
  },
  item: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

