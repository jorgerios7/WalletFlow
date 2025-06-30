import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onPress?: () => void;
}

const AddButton: React.FC<Props> = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, { bottom: insets.bottom + -35 }]}>
      {expanded && (
        <>
          <SmallButton
            icon="camera-alt"
            offset={160}
            onPress={() => console.log('Câmera')}
          />
          <SmallButton
            icon="edit"
            offset={90}
            onPress={() => console.log('Editar')}
          />
        </>
      )}

      <TouchableHighlight
        onPress={toggleExpanded}
        style={styles.shadowWrapper}
        underlayColor={Colors.light.shadow}
      >
        <LinearGradient
          colors={[
            Colors.light.highlightBackgroun_1,
            Colors.light.highlightBackgroun_2,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.addButton}
        >
          <MaterialIcons name={expanded ? 'close' : 'add'} size={28} color={Colors.light.background} />
        </LinearGradient>
      </TouchableHighlight>
    </View>
  );
};

interface SmallButtonProps {
  icon: any;
  offset: number;
  onPress: () => void;
}

const SmallButton: React.FC<SmallButtonProps> = ({ icon, offset, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.smallButtonWrapper, { bottom: offset }]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[Colors.light.highlightBackgroun_1, Colors.light.highlightBackgroun_2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.smallButton}
      >
        <MaterialIcons name={icon} size={24} color={Colors.light.background} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const BUTTON_SIZE = 72;
const SMALL_BUTTON_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -BUTTON_SIZE / 2 }],
    zIndex: 100,
  },
  shadowWrapper: {
    borderRadius: BUTTON_SIZE / 2,
  },
  addButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.light.shadow,
  },
  smallButtonWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -SMALL_BUTTON_SIZE / 2 }],
  },
  smallButton: {
    width: SMALL_BUTTON_SIZE,
    height: SMALL_BUTTON_SIZE,
    borderRadius: SMALL_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export default AddButton;
