import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionType } from '@/app/types/Finance';
import { Colors } from '@/constants/Colors';

import FinancialProvider from '@/app/context/FinancialProvider';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { useUser } from '@/app/context/UserProvider';
import DynamicBackground from '@/app/layout/dynamicBackground';
import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import GroupScreen from '@/app/screens/groupScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import CreateTransactionScreen from '@/app/screens/transactionsScreen/transactionEditor/createTransactionScreen';
import FloatingActionMenu from './floatingActionMenu';
import TabButton from './tabButton';

const TabNavigation: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const { preferences } = useContext(PreferencesContext);
  
  const insets = useSafeAreaInsets();

  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("none");

  const ProfileWrapper = () => (
    <ProfileScreen />
  );

  const GroupWrapper = () => (
    <GroupScreen />
  )

  const TransactionsWrapper = () => (
    <FinancialProvider groupId={user.groupId}>
      <TransactionsScreen />
    </FinancialProvider>
  );

  const Tabs = ({ navigation }: any) => (
    <DynamicBackground styles={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <CreateTransactionScreen
        isVisible={showCreateTransaction}
        type={transactionType}
        groupId={user.groupId}
        onDismiss={() => setShowCreateTransaction(false)}
      />

      <Tab.Navigator
        initialRouteName={preferences.initScreen}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: styles.item,
          tabBarStyle: [styles.tabBar, {
            backgroundColor: Colors[preferences.theme.appearance].surface, shadowColor: Colors[preferences.theme.appearance].shadow
          }]
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
              <TabButton {...props} iconName="receipt-long" />
          }}
        />

        <Tab.Screen
          name={"createTransaction"}
          options={{
            tabBarButton: () => (
              <FloatingActionMenu
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
          name={'group'}
          component={GroupWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} iconName='group' />
          }}
        />

        <Tab.Screen
          name={'profile'}
          component={ProfileWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} iconName='verified-user' />
          }}
        />

      </Tab.Navigator>
    </DynamicBackground >
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: { height: 60, elevation: 0.5, borderTopWidth: 0.5 },
  item: { justifyContent: "center", alignItems: "center", height: 60, backgroundColor: "transparent" }
});

export default TabNavigation;
