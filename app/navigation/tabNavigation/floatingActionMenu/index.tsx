import { TransactionType } from '@/app/types/Finance';
import { ThemeContext } from '@/components/ThemeProvider';
import { Colors } from '@/constants/Colors';
import React, { useContext, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FabButton from './fabButton';
import MenuActionButton from './menuActionButton';

const FloatingActionMenu: React.FC<{ onPress: (value: TransactionType) => void }> = ({ onPress }) => {

  const { theme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => { setExpanded(!expanded) };

  return (
    <>
      <Modal visible={expanded} animationType="fade" transparent>
        <Pressable style={[styles.overlay, { backgroundColor: Colors[theme.appearance].overlay, }]} onPress={() => toggleExpanded()}>

          <View style={styles.menuActionButtonContainer}>
            <MenuActionButton
              text={'Adicionar Receita'}
              icon="attach-money"
              size={48}
              onPress={() => {
                onPress('income');
                toggleExpanded()
              }}
            />

            <MenuActionButton
              text={'Adicionar Despesa'}
              icon="money-off"
              size={48}
              onPress={() => {
                onPress('expense');
                toggleExpanded()
              }}
            />
          </View>

          <View style={[styles.fabButtonContainer, { bottom: insets.bottom + -35 }]}>
            <FabButton onPress={toggleExpanded} expanded={expanded} size={72} />
          </View>
        </Pressable>
      </Modal>

      <View style={[styles.fabButtonContainer, { bottom: insets.bottom + -35 }]}>
        <FabButton onPress={toggleExpanded} expanded={expanded} size={72} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fabButtonContainer: {
    position: 'absolute', left: '50%', transform: [{ translateX: -72 / 2 }],
    zIndex: 100, backgroundColor: "transparent"
  },
  menuActionButtonContainer: {
    width: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: "transparent", position: 'absolute', bottom: 100, gap: 20
  },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default FloatingActionMenu;
