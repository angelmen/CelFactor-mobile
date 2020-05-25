import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ventas from '../pages/Ventas';

const Tab = createBottomTabNavigator();

export default function InventarioStak() {
  return (
    <Tab.Navigator initialRouteName="Ventas">
      <Tab.Screen
        name="Ventas"
        component={Ventas}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
