import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Facturas from '../pages/Facturas/Facturas'

const Tab = createBottomTabNavigator();

export default function FacturasStak() {
  return (
    <Tab.Navigator initialRouteName="Facturas">
      <Tab.Screen
        name="Facturas"
        component={Facturas}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
