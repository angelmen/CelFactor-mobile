import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Inventario from '../pages/Inventario';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct'

const Tab = createBottomTabNavigator();

export default function InventarioStak() {
  return (
    <Tab.Navigator initialRouteName="Inventario">
      <Tab.Screen
        name="Inventario"
        component={Inventario}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="EditProduct"
        component={EditProduct}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
