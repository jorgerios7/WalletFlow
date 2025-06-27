import AddButton from '@/components/ui/AddButton';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddScreen from '../screens/AddScreens';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/settingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <View style={styles.container}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarButton: (props) => <AddButton onPress={ () => props.onPress!} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 10,
  },
});

export default BottomTabs;
