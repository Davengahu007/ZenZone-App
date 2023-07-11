import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from 'react-native-vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import JournalsScreen from './Journals';
import Assessment from './Assessment';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
const AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);

const UserDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Journals') {
            iconName = focused ? 'pencil' : 'pencil-outline';
          } else if (route.name === 'Assessment') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } 

          // Return the animated icon component
          return (
            <AnimatedIcon
              name={iconName}
              size={size}
              color={color}
              animation={focused ? 'bounceIn' : undefined} // Choose the animation
              duration={500}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintfontWeight: 'bold',
        tabBarInactiveTintfontWeight: 'bold',
        tabBarActiveTintColor: '#2980B9', 
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          shadowColor: "#000",
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#7FB3D5',
        },
      })}
    >
<Tab.Screen 
    name="Home" 
    component={HomeScreen} 
    options={{ headerShown: false }} 
/>
<Tab.Screen 
    name="Journals" 
    component={JournalsScreen} 
    options={{ headerShown: false }} 
/>
<Tab.Screen 
    name="Assessment" 
    component={Assessment} 
    options={{ headerShown: false }} 
/>
<Tab.Screen 
    name="Profile" 
    component={ProfileScreen} 
    options={{ headerShown: false }} 
/>
    </Tab.Navigator>


  );
};

export default UserDashboard;
