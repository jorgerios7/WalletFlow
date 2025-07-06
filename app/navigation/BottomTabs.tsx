import AddButton from '@/components/ui/AddButton';
import TabButton from '@/components/ui/TabButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import AddScreen from '../screens/AddScreens';
import AnalysisScreen from '../screens/AnalysisScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
          name="Add"
          component={AddScreen}
          options={{
            tabBarButton: () => (
              <AddButton
                onPress={() => console.log('button more pressed')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Transações"
          component={TransactionScreen}
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
