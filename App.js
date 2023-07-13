import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/auth/Home';
import Register from './screens/auth/Register';
import UserDashboard from './screens/UserDashboard';
import PasswordReset from './screens/auth/PasswordReset';
import Journal from './screens/Journals'; 
import HomeScreen from './screens/HomeScreen';
import Analysis from './screens/analysis';  
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#7FB3D5'
  }
};

export default function App() {
  const [token, setToken] = useState(null);

  const loadToken = async () => {
    const savedToken = await AsyncStorage.getItem('userToken');
    setToken(savedToken);
  };

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadToken();
    }, 1000); // check every second
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} setToken={setToken} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDashboard">
          {(props) => <UserDashboard {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="Journals" component={Journal} />
        <Stack.Screen name="Analysis" component={Analysis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}