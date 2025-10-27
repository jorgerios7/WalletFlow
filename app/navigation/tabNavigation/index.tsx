import AddTransactionScreen from '@/app/screens/addTransactionScreen';
import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import { ConfigurationScreen } from '@/app/screens/ConfigurationScreen';
import { FeedbackScreen } from '@/app/screens/FeedbackScreen';
import { HelpScreen } from '@/app/screens/HelpScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import { TransactionType } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddButton from './addButton';
import TabButton from './tabButton';

interface Props { userData: User; onDismis: () => void }

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigation: React.FC<Props> = ({ userData, onDismis }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  const insets = useSafeAreaInsets();

  type TabScreen = 'Analytic' | 'Transactions' | 'AddData' | 'Profile';

  const [confirmationScreenVisible, setConfirmationScreenVisible] = useState(false);
  const [currentTabScreen, setCurrentTabScreen] = useState<TabScreen>('Analytic');
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [typeValue, setTypeValue] = useState<TransactionType>('income');
  const [addDataVisible, setAddDataVisible] = useState(false);

  const handleLogout = () => (
    setIsDeleteAccount(false),
    setConfirmationScreenVisible(true)
  );

  const handleDeleteAccount = () => (
    setIsDeleteAccount(true),
    setConfirmationScreenVisible(true)
  );

  const logout = async () => {
    setConfirmationScreenVisible(false);
    try {
      await signOut(auth);
      onDismis();
    } catch (error) {
      console.error('(BottomTabs) Erro ao deslogar:', error);
    }
  };

  const deleteAccount = async () => {
    console.log('(BottomTabs) deleteAccount is called!');
  }

  const ProfileWrapper = ({ navigation }: any) => (
    <ProfileScreen
      onLogout={handleLogout}
      onDeleteAccount={handleDeleteAccount}
      onNavigate={(locate) => navigation.navigate(locate)}
    />
  );

  const AddDataWrapper = ({ navigation }: any) => (
    <View />
  );

  const ConfigurationWrapper = ({ navigation }: any) => (
    <ConfigurationScreen
      onNavigate={(locate) => navigation.navigate(locate)}
    />
  );

  const HelpWrapper = ({ navigation }: any) => (
    <HelpScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
      }}
    />
  );

  const FeedbackWrapper = ({ navigation }: any) => (
    <FeedbackScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
      }}
    />
  );

  const Tabs = ({ navigation }: any) => {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={{
            width: 45, height: 45, borderRadius: 45 / 2, borderColor: Colors.light.highlightBackgroun_2,
            backgroundColor: Colors.light.highlightBackgroun_2, position: 'absolute', top: insets.top + 10,
            right: 10, zIndex: 10, justifyContent: 'center', alignItems: 'center',
          }}
        >
          <Feather
            name={'user'}
            color={Colors.light.highlightBackgroun_1}
            size={30}
            style={{ backgroundColor: 'white', borderRadius: 45 / 2, padding: 5.5 }}
          />
        </Pressable>

        <ConfirmationScreen
          isVisible={confirmationScreenVisible}
          message={isDeleteAccount ? 'Deseja realmente excluir sua conta?' : 'Deseja realmente sair?'}
          onConfirm={isDeleteAccount ? deleteAccount : logout}
          onCancel={() => setConfirmationScreenVisible(false)}
        />

        <AddTransactionScreen
          isVisible={addDataVisible}
          groupId={userData.groupId}
          onDismiss={() => setAddDataVisible(false)}
          type={typeValue}
        />

        <Tab.Navigator
          initialRouteName={currentTabScreen}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            animation: 'fade',
            tabBarStyle: {
              backgroundColor: Colors.light.background,
              position: 'absolute',
              elevation: 20,
            },
          }}
        >
          <Tab.Screen
            name="Analytic"
            component={AnalyticsScreen}
            initialParams={{ user: userData }}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="bar-chart"
                  label="Análise"
                />
              ),
            }}
          />

          <Tab.Screen
            name="AddData"
            component={AddDataWrapper}
            options={{
              tabBarButton: () => (
                <AddButton
                  onPress={(value) => {
                    setAddDataVisible(true);
                    setTypeValue(value);
                  }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Transactions"
            component={TransactionsScreen}
            initialParams={{ user: userData }}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="list-alt"
                  label="Transações"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileWrapper}
      />

      <Stack.Screen
        name="ConfigurationScreen"
        component={ConfigurationWrapper}
      />

      <Stack.Screen
        name="HelpScreen"
        component={HelpWrapper}
      />

      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackWrapper}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default TabNavigation;
