import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/Home'
import Ventas from './pages/Ventas'
import Inventario from './pages/Inventario'

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Ventas">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Inventario" component={Inventario} />
                <Drawer.Screen name="Ventas" component={Ventas} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}