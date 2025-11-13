import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionType } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';

import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import { ConfigurationScreen } from '@/app/screens/ConfigurationScreen';
import { FeedbackScreen } from '@/app/screens/FeedbackScreen';
import { HelpScreen } from '@/app/screens/HelpScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import CreateTransactionScreen from '@/app/screens/transactionsScreen/transactionEditor/createTransactionScreen';
import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import AddButton from './addButton';
import TabButton from './tabButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface Props {
  userData: User;
  onDismis: () => void;
}

const TabNavigation: React.FC<Props> = ({ userData, onDismis }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const insets = useSafeAreaInsets();

  if (!currentUser) return null;

  // ----- Estados de controle -----
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('income');

  // ----- Ações -----
  const handleLogout = () => {
    setDeleteMode(false);
    setShowConfirmation(true);
  };

  const handleDeleteAccount = () => {
    setDeleteMode(true);
    setShowConfirmation(true);
  };

  const logout = async () => {
    setShowConfirmation(false);
    try {
      await signOut(auth);
      onDismis();
    } catch (error) {
      console.error('(BottomTabs) Erro ao deslogar:', error);
    }
  };

  const deleteAccount = async () => {
    console.log('(BottomTabs) deleteAccount is called!');
  };

  // ----- Wrappers simplificados -----
  const ProfileWrapper = ({ navigation }: any) => (
    <ProfileScreen
      onLogout={handleLogout}
      onDeleteAccount={handleDeleteAccount}
      onNavigate={(screen) => navigation.navigate(screen)}
    />
  );

  const SimpleWrapper = (ScreenComponent: React.FC<any>) => ({ navigation }: any) => (
    <ScreenComponent onNavigate={(screen: string) => navigation.navigate(screen)} />
  );

  const TransactionsWrapper = () => <TransactionsScreen group_id={userData.groupId} />;

  // ----- Tabs -----
  const Tabs = ({ navigation }: any) => (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Botão de Perfil */}
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={[
          styles.profileButton,
          { top: insets.top + 10 },
        ]}
      >
        <Feather
          name="user"
          color={Colors.light.highlightBackgroun_1}
          size={30}
          style={styles.profileIcon}
        />
      </Pressable>

      {/* Modal de confirmação */}
      <ConfirmationScreen
        isVisible={showConfirmation}
        message={deleteMode ? 'Deseja realmente excluir sua conta?' : 'Deseja realmente sair?'}
        onConfirm={deleteMode ? deleteAccount : logout}
        onCancel={() => setShowConfirmation(false)}
      />

      {/* Tela de criação de transação */}
      <CreateTransactionScreen
        isVisible={showCreateTransaction}
        type={transactionType}
        groupId={userData.groupId}
        onDismiss={() => setShowCreateTransaction(false)}
      />

      {/* Navegação por abas */}
      <Tab.Navigator
        initialRouteName="Analytic"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Analytic"
          component={AnalyticsScreen}
          initialParams={{ user: userData }}
          options={{
            tabBarButton: (props) => <TabButton {...props} iconName="bar-chart" label="Análise" />,
          }}
        />

        <Tab.Screen
          name="CreateTransaction"
          options={{
            tabBarButton: () => (
              <AddButton
                onPress={(value) => {
                  setTransactionType(value);
                  setShowCreateTransaction(true);
                }}
              />
            ),
          }}
        >
          {() => null}
        </Tab.Screen>

      <Tab.Screen
        name="Transactions"
        component={TransactionsWrapper}
        options={{
          tabBarButton: (props) => <TabButton {...props} iconName="list-alt" label="Transações" />,
        }}
      />
    </Tab.Navigator>
    </View >
  );

// ----- Navegação Stack -----
return (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Profile" component={ProfileWrapper} />
    <Stack.Screen name="ConfigurationScreen" component={SimpleWrapper(ConfigurationScreen)} />
    <Stack.Screen name="HelpScreen" component={SimpleWrapper(HelpScreen)} />
    <Stack.Screen name="FeedbackScreen" component={SimpleWrapper(FeedbackScreen)} />
  </Stack.Navigator>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.light.background,
    position: 'absolute',
    elevation: 20,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: Colors.light.highlightBackgroun_2,
    backgroundColor: Colors.light.highlightBackgroun_2,
    position: 'absolute',
    right: 10,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: 'white',
    borderRadius: 45 / 2,
    padding: 5.5,
  },
});

export default TabNavigation;
