import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AsyncStorage} from 'react-native'

import AuthStack from './stacks/AuthStack'

import Home from './pages/Home'
import InventarioStack from './stacks/InvetarioStack'
import VentasStack from './stacks/VentasStack'
import FacturasStack from './stacks/FacturasStack'
import ClientesStack from './stacks/ClientesStack'


const Drawer = createDrawerNavigator();

async function isAuthenticated(){
  const userToken = await JSON.parse(AsyncStorage.getItem('@userToken'))
  if(userToken.hash != null && userToken.age < 15){
    return true
  } else return false
}



export default function Navigation() {
    
    if(false){
      return (
        <SafeAreaProvider>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Ventas">
                <Drawer.Screen name="Inicio" component={Home}/>
                <Drawer.Screen name="Inventario" component={InventarioStack} />
                <Drawer.Screen name="Ventas" component={VentasStack} />
                <Drawer.Screen name="Facturas" component={FacturasStack} />
                <Drawer.Screen name="Clientes" component={ClientesStack} />
            </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}