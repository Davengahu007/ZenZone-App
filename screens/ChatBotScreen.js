import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

const OPENAI_API_KEY = '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';

export default function ChatBotScreen() {
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([{ text: 'Welcome to ZenChat! Feel free to talk about how your day is going.', fromUser: false }]);
  const [input, setInput] = useState('');
  const titlePosition = useRef(new Animated.Value(-300)).current;
  const [isLoading, setIsLoading] = useState(false);
  
  const getGpt3Response = async (message) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 60,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const gpt3Response = response.data.choices[0].message.content.trim();
      setIsLoading(false);
      return gpt3Response;
    } catch (error) {
      setIsLoading(false);
      console.error('Error getting response from OpenAI: ', error);
      return 'Error getting response from OpenAI: ' + JSON.stringify(error);
    }
  };
  

  useEffect(() => {
    setTimeout(() => handleSend(''), 1000);
    Animated.spring(titlePosition, {
      toValue: 0, 
      friction: 25.8, 
      tension: 5, 
      useNativeDriver: true
    }).start();
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') {
      return;
    }
  
    setMessages([...messages, {text: input, fromUser: true}]);
    const botMessage = await getGpt3Response(input);
    setMessages(previousMessages => [...previousMessages, { text: botMessage, fromUser: false }]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Animated.View style={{...styles.header, transform: [{ translateY: titlePosition }]}}>
        <Text style={styles.title}>ZenChat</Text>
      </Animated.View>
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={styles.scrollContainer}
      >
        {messages.map((item, index) => (
          <View key={index} style={item.fromUser ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Ionicons name="send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
    </KeyboardAvoidingView>
  );
}

// Your styles object remains the same


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#7FB3D5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor:'#2980B9',
    overflow: 'visible', 
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 20,
    backgroundColor: '#F2F3F4',
    paddingTop: 40, 
    paddingBottom:10,

  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#2980B9',
    margin: 10,
    padding: 10,
    backgroundColor:'white'
  },

  button: {
    padding: 10,
    backgroundColor: '#2980B9',
    borderRadius: 15,
    margin: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2980B9',
    borderRadius: 8,
    margin: 8,
    padding: 8,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    borderRadius: 8,
    margin: 8,
    padding: 8,
  },
  messageText: {
    fontSize: 16,
  },
});
