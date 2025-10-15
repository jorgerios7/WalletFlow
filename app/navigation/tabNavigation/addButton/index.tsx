import { TransactionType } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  onPress: (value: TransactionType) => void;
}

const AddButton: React.FC<Props> = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Modal visible={expanded} animationType="fade" transparent>
        <Pressable style={styles.overlay} onPress={() => toggleExpanded()}>
          <View style={[styles.container, { bottom: insets.bottom + -35 }]}>
            <SmallButton
              text={'Adicionar Receita'}
              icon="attach-money"
              offset={230}
              onPress={() => {
                onPress('income');
                toggleExpanded()
              }}
            />

            <SmallButton
              text={'Adicionar Lucro'}
              icon="bar-chart"
              offset={160}
              onPress={() => {
                onPress('profit');
                toggleExpanded()
              }}
            />

            <SmallButton
              text={'Adicionar Despesa'}
              icon="money-off"
              offset={90}
              onPress={() => {
                onPress('expense');
                toggleExpanded()
              }}
            />

            <LargeButton onPress={toggleExpanded} expanded={expanded} />

          </View>
        </Pressable>
      </Modal>

      <View style={[styles.container, { bottom: insets.bottom + -35 }]}>
        <LargeButton onPress={toggleExpanded} expanded={expanded} />
      </View>
    </>
  );
};

const LargeButton: React.FC<{
  onPress: () => void, expanded: boolean
}> = ({
  onPress, expanded
}) => {
    return (
      <TouchableHighlight
        onPress={onPress}
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
    );
  }

const SmallButton: React.FC<{
  icon: any, text: string, offset: number, onPress: () => void;
}> = ({
  icon, text, offset, onPress
}) => {
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
          style={[styles.smallButton, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }]}
        >
          <MaterialIcons name={icon} size={22} color={Colors.light.background} />
          <Text style={{ color: Colors.light.background, marginLeft: 6, fontSize: 14, fontWeight: "500" }} numberOfLines={1}>
            {text}
          </Text>
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
    left: '-20%',
    transform: [{ translateX: -SMALL_BUTTON_SIZE / 2 }]
  },
  smallButton: {
    width: SMALL_BUTTON_SIZE + 100,
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
  overlay: {
    flex: 1,
    backgroundColor: "#00000031",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddButton;
