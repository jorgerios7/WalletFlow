import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/AddScreens';
import AnalysisScreen from '../screens/AnalysisScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { Group } from '../types/Group';
import { User } from '../types/User';

interface Props { userData: User; groupData: Group }

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC<Props> = ({ userData, groupData }) => {
  const insets = useSafeAreaInsets();
  const [confirmationScreenVisibility, setConfirmationScreenVisibility] = useState(false);

  const ProfileWrapper = () => (
    <ProfileScreen
      user={userData}
      onLogout={handleLogout}
    />
  );

  const handleLogout = () => {
    setConfirmationScreenVisibility(true);
  };

  const confirmLogout = () => {
    setConfirmationScreenVisibility(false);
    console.log('Usuário deslogado!');
    // Aqui você pode colocar o signOut do Firebase ou outra lógica
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <ConfirmationScreen
        isVisible={confirmationScreenVisibility}
        message={'Deseja realmente sair?'}
        onConfirm={confirmLogout}
        onCancel={() => setConfirmationScreenVisibility(false)}
      />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.light.background,
            position: 'absolute',
            elevation: 20,
          },
        }}
      >
        <Tab.Screen
          name="Análise"
          component={AnalysisScreen}
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
          name="Transações"
          component={TransactionScreen}
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

        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarButton: (props) => (
              <TabButton
                {...props}
                iconName="add"
                label="Adicionar"
              />
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={ProfileWrapper}
          options={{
            tabBarButton: (props) => (
              <TabButton
                {...props}
                iconName="person"
                label="Perfil"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    gap: 20
  },
});

export default BottomTabs;
