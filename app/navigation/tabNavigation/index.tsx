import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionType } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';

import { PreferencesContext } from '@/app/context/PreferencesProvider';
import DynamicBackground from '@/app/layout/dynamicBackground';
import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import GroupScreen from '@/app/screens/groupScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import CreateTransactionScreen from '@/app/screens/transactionsScreen/transactionEditor/createTransactionScreen';
import { Group } from '@/app/types/Group';
import FloatingActionMenu from './floatingActionMenu';
import TabButton from './tabButton';

interface Props {
  isVisible: boolean, userData: User, groupData: Group, onUpdating: (isUpdating: boolean) => void, onDismiss: () => void
};

const TabNavigation: React.FC<Props> = ({ isVisible, userData, groupData, onUpdating, onDismiss }) => {
  if (!isVisible) return null;

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const { preferences } = useContext(PreferencesContext);

  const insets = useSafeAreaInsets();

  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("none");

  const ProfileWrapper = () => (
    <ProfileScreen
      userData={userData}
      onUpdating={() => onUpdating(true)}
      onDismiss={onDismiss}
    />
  );

  const GroupWrapper = () => (
    <GroupScreen
      creator={groupData.creation}
      currentUserId={currentUser ? currentUser.uid : ""}
      groupId={userData.groupId}
      groupName={groupData.name}
      memberList={groupData.members}
      onUpdating={onUpdating}
      onExiting={onDismiss}
    />
  )

  const TransactionsWrapper = () => (<TransactionsScreen group_id={userData.groupId} />);

  const Tabs = ({ navigation }: any) => (
    <DynamicBackground styles={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <CreateTransactionScreen
        isVisible={showCreateTransaction}
        type={transactionType}
        groupId={userData.groupId}
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
          initialParams={{ user: userData }}
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
