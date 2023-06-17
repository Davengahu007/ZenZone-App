import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Home' screenOptions={{HeaderShown:false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
