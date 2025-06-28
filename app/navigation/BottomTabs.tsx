import AddButton from '@/components/ui/AddButton';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddScreen from '../screens/AddScreens';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true, // ✅ Mostrar nome abaixo do ícone
          tabBarActiveTintColor: Colors.light.tint, // cor ativa
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: Colors.light.background,
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: 'transparent'
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarButton: () => (
              <AddButton onPress={ () => console.log('More button pressed!')} /> // ✅ Correção: chamada direta da função
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Configurações',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
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
});

export default BottomTabs;
