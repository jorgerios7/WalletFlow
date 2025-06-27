// src/components/CustomAddButton.tsx
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const AddButton: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.addButton}>
    <MaterialIcons name="add" size={30} color="#fff" />
  </TouchableOpacity>
);

const BUTTON_SIZE = 60;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: -20, // distância do fundo (acima da tabBar)
    left: '50%',
    transform: [{ translateX: -BUTTON_SIZE / 2 }],
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
});

export default AddButton;
