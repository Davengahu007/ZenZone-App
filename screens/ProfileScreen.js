import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const screenHeight = -300; 
  const screenWidth = -300; 
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
        positionEmail.setValue(screenHeight);
        positionLogout.setValue(screenWidth);
      };
    }, [])
  );

  useEffect(() => {
    async function fetchJournalEntries() {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const response = await axios.get(`https://09da-2c0f-fe38-2100-2861-8942-8f58-eda6-8f6a.ngrok-free.app/api/getJournalEntries/${email}`);
        setJournalEntries(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchJournalEntries();
  }, []);

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
      <View style={styles.journalHeader}>
        <Text style={styles.logoutButtonText}>My Journals</Text>
      </View>
      <ScrollView style={styles.entriesContainer}>
        {journalEntries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.entryText}>Date: {entry.date}</Text>
            <Text style={styles.entryText}>Mood: {entry.mood}</Text>
            <Text style={styles.entryText}>Story: {entry.story}</Text>
          </View>
        ))}
      </ScrollView>
      <Animated.View style={{ transform: [{ translateX: positionLogout }] }}>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Analysis')}>
  <Text style={styles.logoutButtonText}>View Mental Health Analysis</Text>
</TouchableOpacity>

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
    paddingHorizontal: 20, // For consistent side padding
    paddingTop: 50, // To push everything down from the top
  },
  emailBlock: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 30, // Set the space below the email block
    maxWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  journalHeader: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 15, // Set the space below the journal header
    maxWidth: 200,
  },
  entriesContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  entryContainer: {
    backgroundColor: '#F2F3F4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  entryText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#3182CE', 
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 30, // Assuming you want some space before the logout button
    maxWidth: 200,
  },
  logoutButtonText: {
    color: '#FFFFFF', 
    textAlign: 'center',
    fontWeight:'bold'
  },
});