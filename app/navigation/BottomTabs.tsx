import ConfirmationScreen from '@/components/ui/ConfirmationScreen';
import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/AddScreens';
import AnalysisScreen from '../screens/AnalysisScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { User } from '../types/User';

interface Props { userData: User; onDismis: () => void }

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC<Props> = ({ userData, onDismis}) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) return;

  const insets = useSafeAreaInsets();
  const [confirmationScreenVisibility, setConfirmationScreenVisibility] = useState(false);

  const ProfileWrapper = () => (
    <ProfileScreen
      onLogout={handleLogout}
    />
  );

  const handleLogout = () => {
    setConfirmationScreenVisibility(true);
  };

  const confirmLogout = async () => {
    setConfirmationScreenVisibility(false);
    try {
      await signOut(auth);
      onDismis();
      
    } catch (error) {
      console.error("(BottomTabs) Erro ao deslogar:", error);
    }

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
