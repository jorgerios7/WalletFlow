import CustomButton from '@/components/ui/CustomButton';
import TabButton from '@/components/ui/TabButton';
import TextButton from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/AddScreens';
import AnalysisScreen from '../screens/AnalysisScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { Home } from '../types/Home';
import { User } from '../types/User';

interface Props { userData: User; homeData: Home }

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC<Props> = ({ userData, homeData }) => {
  const insets = useSafeAreaInsets();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const ProfileWrapper = () => (
    <ProfileScreen
      user={userData}
      home={homeData}
      onLogout={handleLogout}
    />
  );

  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const confirmLogout = () => {
    setLogoutVisible(false);
    console.log('Usuário deslogado!');
    // Aqui você pode colocar o signOut do Firebase ou outra lógica
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <Modal visible={logoutVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
              Deseja realmente sair?
            </Text>
            <CustomButton text={'Sim'} onPress={confirmLogout} />
            <TextButton text={'Cancelar'} onPress={() => setLogoutVisible(false)} />
          </View>
        </View>
      </Modal>

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
