import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { useUser } from '@/app/context/UserProvider';
import CreateTransactionScreen from '@/app/screens/transactionsScreen/transactionEditor/createTransactionScreen';
import { TransactionType } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';
import React, { useContext, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import FabButton from './fabButton';
import MenuActionButton from './menuActionButton';
import { styles } from './styles';

const TransactionActionMenu: React.FC = () => {
  const { user } = useUser();
  const { preferences } = useContext(PreferencesContext);

  if (!user?.groupId) return null;

  const [expanded, setExpanded] = useState(false);
  const [createTransVisible, setCreateTransVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('none');

  const openMenu = () => {
    setExpanded(true);
    setCreateTransVisible(false);
    setTransactionType('none');
  };

  const closeMenu = () => {
    setExpanded(false);
    setCreateTransVisible(false);
    setTransactionType('none');
  };

  const openCreateTransaction = (type: TransactionType) => {
    setTransactionType(type);
    setCreateTransVisible(true);
  };

  return (
    <>
      <Modal
        visible={expanded}
        animationType="fade"
        transparent
      >
        <Pressable
          onPress={() => !createTransVisible && closeMenu()}
          style={[
            styles.overlay,
            { backgroundColor: Colors[preferences.theme.appearance].overlay },
          ]}
        >
          <CreateTransactionScreen
            isVisible={createTransVisible}
            type={transactionType}
            groupId={user.groupId}
            onDismiss={closeMenu}
          />

          {!createTransVisible && (
            <View style={styles.menuActionContainer}>
              <MenuActionButton
                text="Adicionar Receita"
                icon="attach-money"
                onPress={() => openCreateTransaction('income')}
              />

              <MenuActionButton
                text="Adicionar Despesa"
                icon="money-off"
                onPress={() => openCreateTransaction('expense')}
              />
            </View>
          )}
        </Pressable>
      </Modal>

      <FabButton onPress={openMenu} expanded={expanded} />
    </>
  );
};

export default TransactionActionMenu;
