import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

import FinancialProvider from '@/app/context/FinancialProvider';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { useUser } from '@/app/context/UserProvider';
import DynamicBackground from '@/app/layout/dynamicBackground';
import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import GroupScreen from '@/app/screens/groupScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import ProfileTabButton from './profileTabButon';
import { styles } from './styles';
import TabButton from './tabButton';
import TransactionActionMenu from './transactionActionMenu';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigation: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const { preferences } = useContext(PreferencesContext);

  const insets = useSafeAreaInsets();

  const ProfileWrapper = () => (
    <ProfileScreen />
  );

  const GroupWrapper = () => (
    <GroupScreen />
  );

  const TransactionsWrapper = () => (
    <FinancialProvider groupId={user.groupId}>
      <TransactionsScreen />
    </FinancialProvider>
  );

  const Tabs = ({ navigation }: any) => (
    <DynamicBackground
      styles={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }}
    >
      <Tab.Navigator
        initialRouteName={preferences.initScreen}
        screenOptions={{
          animation: "shift",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: styles.item,
          sceneStyle: {
            backgroundColor: Colors[preferences.theme.appearance].background
          },
          tabBarStyle: [
            styles.tabBar,
            { backgroundColor: Colors[preferences.theme.appearance].background }
          ]
        }}
      >
        <Tab.Screen
          name="analysis"
          component={AnalyticsScreen}
          initialParams={{ user: user }}
          options={{
            tabBarButton: (props) =>
              <TabButton {...props} iconName="home" />
          }}
        /> 

        <Tab.Screen
          name="transactions"
          component={TransactionsWrapper}
          options={{
            tabBarButton: (props) =>
              <TabButton {...props} iconName="dashboard" />
          }}
        />

        <Tab.Screen
          name={"createTransaction"}
          options={{
            tabBarButton: () => (
              <TransactionActionMenu />
            ),
          }}
        >
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name={'group'}
          component={GroupWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} iconName='workspaces' />
          }}
        />

        <Tab.Screen
          name={'profile'}
          component={ProfileWrapper}
          options={{
            tabBarButton: (props) => <ProfileTabButton {...props} />
          }}
        />

      </Tab.Navigator>
    </DynamicBackground>
  );

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="tabs"
          component={Tabs}
        />
      </Stack.Navigator>
    </>
  );
};

export default TabNavigation;
