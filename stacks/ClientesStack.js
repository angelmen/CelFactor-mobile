import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Clientes from '../pages/Clientes/Clientes'
import AddClient from '../pages/Clientes/AddClient'
import EditClient from '../pages/Clientes/EditClient'


const Tab = createBottomTabNavigator();

export default function ClientesStak() {
  return (
    <Tab.Navigator initialRouteName="Clientes">
      <Tab.Screen
        name="Clientes"
        component={Clientes}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="AddClient"
        component={AddClient}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="EditClient"
        component={EditClient}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
