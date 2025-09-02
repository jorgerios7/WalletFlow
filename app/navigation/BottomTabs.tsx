import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/addScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { HelpScreen } from '../screens/HelpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { User } from '../types/User';

interface Props {
  userData: User;
  onDismis: () => void;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs: React.FC<Props> = ({ userData, onDismis }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  const insets = useSafeAreaInsets();

  const [confirmationScreenVisible, setConfirmationScreenVisible] = useState(false);
  const [screenRender, setScreenRender] = useState('AnalyticsScreen');
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);

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

  const AddWrapper = () => (
    <AddScreen />
  );

  const ConfigurationWrapper = ({ navigation }: any) => (
    <ConfigurationScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        setScreenRender('ProfileScreen');
      }}
    />
  );

  const HelpWrapper = ({ navigation }: any) => (
    <HelpScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        setScreenRender('ProfileScreen');
      }}
    />
  );

  const FeedbackWrapper = ({ navigation }: any) => (
    <FeedbackScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        setScreenRender('ProfileScreen');
      }}
    />
  );

  function Tabs() {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ConfirmationScreen
          isVisible={confirmationScreenVisible}
          message={isDeleteAccount ? 'Deseja realmente excluir a sua conta?' : 'Deseja realmente sair?'}
          onConfirm={isDeleteAccount ? deleteAccount : logout}
          onCancel={() => setConfirmationScreenVisible(false)}
        />

        <Tab.Navigator
          initialRouteName={screenRender}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            animation: 'shift',
            tabBarStyle: {
              backgroundColor: Colors.light.background,
              position: 'absolute',
              elevation: 20,
            },
          }}
        >
          <Tab.Screen
            name="AnalyticsScreen"
            component={AnalyticsScreen}
            initialParams={{ user: userData }}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="bar-chart"
                  label="Análise"
                  focused={props.accessibilityState?.selected}
                />
              ),
            }}
          />

          <Tab.Screen
            name="TransactionScreen"
            component={TransactionScreen}
            initialParams={{ user: userData }}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="list-alt"
                  label="Transações"
                  focused={props.accessibilityState?.selected}
                />
              ),
            }}
          />

          <Tab.Screen
            name="AddScreen"
            component={AddWrapper}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="add"
                  label="Adicionar"
                  focused={props.accessibilityState?.selected}
                />
              ),
            }}
          />

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileWrapper}
            options={{
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  iconName="person"
                  label="Perfil"
                  focused={props.accessibilityState?.selected}
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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
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
  container: {
    flex: 1,
  },
});

export default BottomTabs;
