import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TransactionType } from '@/app/types/Finance';
import { User } from '@/app/types/User';
import { Colors } from '@/constants/Colors';

import AnalyticsScreen from '@/app/screens/AnalyticsScreen';
import GroupScreen from '@/app/screens/groupScreen';
import ProfileScreen from '@/app/screens/profileScreen';
import TransactionsScreen from '@/app/screens/transactionsScreen';
import CreateTransactionScreen from '@/app/screens/transactionsScreen/transactionEditor/createTransactionScreen';
import { Group } from '@/app/types/Group';
import { ThemeContext } from '@/components/ThemeProvider';
import AddButton from './addButton';
import TabButton from './tabButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface Props {
  isVisible: boolean, userData: User, groupData: Group, onUpdating: (isUpdating: boolean) => void, onDismiss: () => void
}

const TabNavigation: React.FC<Props> = ({ isVisible, userData, groupData, onUpdating, onDismiss }) => {
  if (!isVisible) return null;

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const { theme } = useContext(ThemeContext);

  const insets = useSafeAreaInsets();

  const [showCreateTransaction, setShowCreateTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('income');

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
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>

      <CreateTransactionScreen
        isVisible={showCreateTransaction}
        type={transactionType}
        groupId={userData.groupId}
        onDismiss={() => setShowCreateTransaction(false)}
      />

      <Tab.Navigator
        initialRouteName="Analytic"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [styles.tabBar, {
            backgroundColor: Colors[theme.appearance].surface, borderTopColor: Colors[theme.appearance].border, shadowColor: Colors[theme.appearance].shadow
          }],
          tabBarItemStyle: styles.item
        }}
      >
        <Tab.Screen
          name="Analytic"
          component={AnalyticsScreen}
          initialParams={{ user: userData }}
          options={{
            tabBarButton: (props) => <TabButton {...props} theme={theme.appearance} iconName="bar-chart" label="Análise" />
          }}
        />

        <Tab.Screen
          name="Transactions"
          component={TransactionsWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} theme={theme.appearance} iconName="list-alt" label="Transações" />
          }}
        />

        <Tab.Screen
          name={"CreateTransaction"}
          options={{
            tabBarButton: () => (
              <AddButton
                theme={theme.appearance}
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
          name={'Group'}
          component={GroupWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} theme={theme.appearance} iconName='group' label='Grupo' />
          }}
        />

        <Tab.Screen
          name={'Profile'}
          component={ProfileWrapper}
          options={{
            tabBarButton: (props) => <TabButton {...props} theme={theme.appearance} iconName='verified-user' label='Perfil' />
          }}
        />

      </Tab.Navigator>
    </View >
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }, tabBar: { height: 60, elevation: 0.5, borderTopWidth: 0.5 },
  item: { justifyContent: "center", alignItems: "center", height: 60, backgroundColor: "transparent" }
});

export default TabNavigation;
