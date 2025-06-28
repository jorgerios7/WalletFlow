import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onPress?: () => void;
}

const AddButton: React.FC<Props> = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.addButton, {bottom: insets.bottom + -25 }]}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const BUTTON_SIZE = 72;

const styles = StyleSheet.create({
  addButton: {
    position: 'relative',
    left: '50%',
    transform: [{ translateX: -BUTTON_SIZE / 2 }],
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 10,
  },
});

export default AddButton;
