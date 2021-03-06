import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//import Ventas from '../pages/Ventas';
import AddProductsToOrder from '../pages/Ventas/AddProductsToOrder'
import Cobrar from '../pages/Ventas/Cobrar'
import Ventas from '../pages/Ventas'

const Tab = createBottomTabNavigator();

export default function VentasStak() {
  return (
    <Tab.Navigator initialRouteName="Ventas">
      <Tab.Screen
        name="Ventas"
        component={Ventas}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen
        name="AddProductsToOrder"
        component={AddProductsToOrder}
        options={{ tabBarVisible: false }}
      />
       <Tab.Screen
        name="Cobrar"
        component={Cobrar}
        options={{ tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
