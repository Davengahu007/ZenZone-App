import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native'; 
import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function Journals({route,navigation}) {
  const initialMood = route.params?.mood || ''; 
  const [mood, setMood] = useState(initialMood);
  const [text, setText] = useState('');
  
  const date = format(new Date(), 'MM/dd/yyyy');

  const saveJournalEntry = async () => {
    // Replace with your Laravel backend API endpoint
    const url = 'https://your-api-endpoint';

    try {
      await axios.post(url, {
        mood,
        journalEntry: text,
        date: date 
      });

      setMood('');
      setText('');

      Alert.alert('Success', 'Your journal entry has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while saving your journal entry.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Day</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true} // You can set this to true if you want the scrollbar to appear
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
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={saveJournalEntry}>
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
  },
  moodInput: {
    padding: 20,
    fontSize:20,
    fontWeight:'bold',
  },
  input: {
    minHeight: '100%', 
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
