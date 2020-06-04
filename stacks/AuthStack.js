import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Login from '../pages/login'

const Tab = createBottomTabNavigator();

export default function AuthStack() {
    return (
        <Tab.Navigator initialRouteName="Login">
            <Tab.Screen
                name="Login"
                component={Login}
                options={{ tabBarVisible: false }}
            />
        </Tab.Navigator>
    );
}
