import TabButton from '@/components/ui/TabButton';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
          component={ProfileScreen}
          initialParams={{ user: userData, home: homeData }}
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
});

export default BottomTabs;
