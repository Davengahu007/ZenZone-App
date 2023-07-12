import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');

  const screenHeight = -300; // Change this to the actual value
  const screenWidth = -300; // Change this to the actual value
  const positionEmail = useRef(new Animated.Value(screenHeight)).current;
  const positionLogout = useRef(new Animated.Value(screenWidth)).current;

  useFocusEffect(
    React.useCallback(() => {
      (async function getEmail() {
        const email = await AsyncStorage.getItem('userEmail');
        if (email !== null) {
          setUserEmail(email);
        }
      })();

      Animated.spring(positionEmail, {
        toValue: 0,
        friction: 25.8,
        tension: 5,
        delay: 200,
        useNativeDriver: true,
      }).start();

      Animated.spring(positionLogout, {
        toValue: 0,
        friction: 25.8,
        tension: 5,
        delay: 200,
        useNativeDriver: true,
      }).start();

      return () => {
        // Reset the animation when the component is unfocused
        positionEmail.setValue(screenHeight);
        positionLogout.setValue(screenWidth);
      };
    }, [])
  );


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Register' }],
      }); 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.emailBlock, { transform: [{ translateY: positionEmail }] }]} >
        <Text style={styles.logoutButtonText}>Email: {userEmail}</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: positionLogout }] }}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emailBlock: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 50,
    marginLeft:20,
    maxWidth:200,
    marginBottom:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#3182CE', 
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
    maxWidth:200,
    marginLeft:100,
    marginBottom:30,
  },
  logoutButtonText: {
    color: '#FFFFFF', 
    textAlign: 'center',
    fontWeight:'bold'
  },
});
