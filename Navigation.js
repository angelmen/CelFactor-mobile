import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context'

import Home from './pages/Home'
import Ventas from './pages/Ventas'
import InventarioStack from './stacks/InvetarioStack'
import VentasStack from './stacks/VentasStack'


const Drawer = createDrawerNavigator();



export default function Navigation() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Ventas">
                <Drawer.Screen name="Inicio" component={Home}/>
                <Drawer.Screen name="Inventario" component={InventarioStack} />
                <Drawer.Screen name="Ventas" component={VentasStack} />
            </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}