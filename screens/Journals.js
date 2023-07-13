import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native'; 
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function Journals({route, navigation}) {
  const initialMood = route.params?.mood || ''; 
  const [mood, setMood] = useState(initialMood);
  const [text, setText] = useState('');

  const titlePosition = useRef(new Animated.Value(300)).current;
  const inputPosition = useRef(new Animated.Value(300)).current;

  const date = format(new Date(), 'MM/dd/yyyy');

  const saveJournalEntry = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    const url = 'https://9915-2c0f-fe38-232b-a5ee-a9cc-4d46-457b-6639.ngrok-free.app/api/journal';

    try {
      await axios.post(url, {
        mood,
        story: text,
        date: date,
        email
      });

      setMood('');
      setText('');

      Alert.alert('Success', 'Your journal entry has been saved.');
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error', 'Something went wrong while saving your journal entry.');
    }
  };

  const confirmSaveJournalEntry = () => {
    Alert.alert(
      "Save Journal Entry?",
      "",
      [
        {
          text: "Continue Editing",
          style: "cancel"
        },
        { text: "Save", onPress: saveJournalEntry }
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      titlePosition.setValue(1000);
      inputPosition.setValue(-1000);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      Animated.spring(titlePosition, {
        toValue: 0, 
        friction: 25.8, 
        tension: 5, 
        useNativeDriver: true
      }).start();

      Animated.spring(inputPosition, {
        toValue: 0,
        friction: 25.8, 
        tension: 5, 
        delay: 200,
        useNativeDriver: true
      }).start();
    }, [])
  );

  return (
    <View style={styles.container}>
      <AnimatedView style={{...styles.header, transform: [{ translateX: titlePosition }]}}>
        <Text style={styles.title}>My Day</Text>
        <Text style={styles.date}>{date}</Text>
      </AnimatedView>
      <AnimatedScrollView 
        style={{...styles.scrollContainer, transform: [{ translateX: inputPosition }]}}
        showsVerticalScrollIndicator={true} 
      >
        <TextInput
          style={styles.moodInput}
          value={mood}
          onChangeText={setMood}
          placeholder="Mood:"
          returnKeyType="next"
        />
        <TextInput
          style={styles.input}
          multiline
          value={text}
          onChangeText={setText}
          textAlignVertical='top'
        />
      </AnimatedScrollView>
      <TouchableOpacity 
        style={styles.button} 
        onPress={confirmSaveJournalEntry}
        disabled={!mood || !text}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#7FB3D5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius:20,
    backgroundColor:'#2980B9',
    overflow: 'visible', 
    marginTop:20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin:20,
    color:'white',
  },
  date: {
    fontSize: 18,
    alignSelf: 'flex-end',
    margin:20,
    color:'white',
  },
  scrollContainer: {
    flex: 1,
    borderRadius: 20,
    marginBottom:20,
    marginTop: 20,
    backgroundColor: '#F2F3F4',
    paddingTop: 20,  
  },
  moodInput: {
    padding: 10,
    marginLeft:10,
    fontSize:20,
    fontWeight:'bold',
  },
  input: {
    padding: 20,
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#2980B9', 
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
  }
});
