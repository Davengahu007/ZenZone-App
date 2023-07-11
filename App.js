import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Home from './screens/auth/Home';
import Register from './screens/auth/Register';
import UserDashboard from './screens/UserDashboard';
import PasswordReset from './screens/auth/PasswordReset';
import Journal from './screens/Journals'; 

enableScreens(); 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FB3D5', 
  },
});


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#7FB3D5'
  }
};

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="ZenZone" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} setToken={setToken} token={token} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UserDashboard">
            {(props) => <UserDashboard {...props} token={token} />}
          </Stack.Screen>
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen name="Journals" component={Journal} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
