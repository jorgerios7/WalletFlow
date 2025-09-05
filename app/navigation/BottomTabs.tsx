import AddButton from '@/components/ui/AddButton';
import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/addScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { ConfigurationScreen } from '../screens/ConfigurationScreen';
import { FeedbackScreen } from '../screens/FeedbackScreen';
import { HelpScreen } from '../screens/HelpScreen';
import ProfileScreen from '../screens/profileScreen';
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

  type TabScreen = 'Analytic' | 'Transactions' | 'Add' | 'Profile';

  const [confirmationScreenVisible, setConfirmationScreenVisible] = useState(false);
  const [tabScreenRender, setTabScreenRender] = useState<TabScreen>('Analytic');
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
    <AddScreen groupId={userData.groupId} />
  );

  const ConfigurationWrapper = ({ navigation }: any) => (
    <ConfigurationScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        //setTabScreenRender('Profile');
      }}
    />
  );

  const HelpWrapper = ({ navigation }: any) => (
    <HelpScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        //setTabScreenRender('Profile');
      }}
    />
  );

  const FeedbackWrapper = ({ navigation }: any) => (
    <FeedbackScreen
      onNavigate={(locate) => {
        navigation.navigate(locate);
        //setTabScreenRender('Profile');
      }}
    />
  );

  const Tabs = ({ navigation }: any) => {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Pressable
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
            backgroundColor: Colors.light.highlightBackgroun_1,
            position: 'absolute',
            top: insets.top,
            right: 10,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Feather name="user" color="white" size={35} />
        </Pressable>

        <ConfirmationScreen
          isVisible={confirmationScreenVisible}
          message={isDeleteAccount ? 'Deseja realmente excluir sua conta?' : 'Deseja realmente sair?'}
          onConfirm={isDeleteAccount ? deleteAccount : logout}
          onCancel={() => setConfirmationScreenVisible(false)}
        />

        <Tab.Navigator
          initialRouteName={tabScreenRender}
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
                  focused={props.accessibilityState?.selected}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Add"
            component={AddWrapper}
            options={{
              tabBarButton: (props) => (
                <AddButton
                  onPress={(value) => navigation.navigate('AddScreen')}


                />
                //<TabButton
                //  {...props}
                //  iconName="add"
                //  label="Adicionar"
                //  focused={props.accessibilityState?.selected}
                ///>
              ),
            }}
          />

          <Tab.Screen
            name="Transactions"
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
        name="Profile"
        component={ProfileWrapper}
      />

      <Stack.Screen
        name="AddScreen"
        component={AddWrapper}
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

export default BottomTabs;
