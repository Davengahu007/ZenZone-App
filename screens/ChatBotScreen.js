import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatBotScreen() {
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([{ text: 'Welcome to ZenChat! Feel free to talk about how your day is going.', fromUser: false }]);
  const [input, setInput] = useState('');
  const titlePosition = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    setTimeout(() => handleSend(''), 1000);
    Animated.spring(titlePosition, {
      toValue: 0, 
      friction: 25.8, 
      tension: 5, 
      useNativeDriver: true
    }).start();
  }, []);

  const handleSend = () => {
    if (input) {
      // User message
      setMessages(prevMessages => [...prevMessages, { text: input, fromUser: true }]);
      // Bot response
      setMessages(prevMessages => [...prevMessages, { text: getBotResponse(input), fromUser: false }]);
      setInput('');
    }
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // Here's where you define your bot logic
  const getBotResponse = (message) => {
    message = message.toLowerCase();
  
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! How can I help you today?';
    }
    
    if (message.includes('good morning')) {
      return 'Good morning! How can I assist you today?';
    }
    
    if (message.includes('good afternoon')) {
      return 'Good afternoon! What can I do for you today?';
    }
    
    if (message.includes('good evening')) {
      return 'Good evening! How can I help you this evening?';
    }
    
    // Goodbyes
    if (message.includes('goodbye') || message.includes('bye')) {
      return 'Goodbye! Have a great day!';
    }
    
    if (message.includes('see you later')) {
      return 'See you later! Take care!';
    }
    
    if (message.includes('good night')) {
      return 'Good night! Sleep well!';
    }
    
    // Checking up on the bot
    if (message.includes('how are you')) {
      return 'I\'m an AI, so I don\'t have feelings, but I\'m here to help you. How can I assist you today?';
    }
    
    // Feelings and emotions
    if (message.includes('happy')) {
      return 'That\'s great! Happiness is the key to a good life. Can you share what made you happy today?';
    }
    
    if (message.includes('sad')) {
      return 'I\'m sorry to hear that. Would you like to talk about it? I\'m here to listen.';
    }
    
    if (message.includes('angry')) {
      return 'I\'m sorry to hear that you\'re feeling angry. It\'s okay to feel this way, would you like to talk more about what happened?';
    }
    
    if (message.includes('tired')) {
      return 'You must have had a long day. Remember to rest well. Would you like to talk about why you\'re feeling tired?';
    }
    
    if (message.includes('excited')) {
      return 'How exciting! Would you like to share more about what you\'re looking forward to?';
    }
    
    if (message.includes('nervous')) {
      return 'It sounds like you have a lot on your mind. Would you like to talk about what is making you feel nervous?';
    }
    
    if (message.includes('scared')) {
      return 'I\'m here with you. You\'re not alone. Would you like to talk about what is scaring you?';
    }
    
    if (message.includes('frustrated')) {
      return 'It\'s tough when things don\'t go as planned. Would you like to talk more about what\'s frustrating you?';
    }
    
    if (message.includes('lonely')) {
      return 'I\'m really sorry that you\'re feeling this way, but I\'m unable to provide the help that you need. It\'s really important to talk things over with someone who can, though, such as a mental health professional or a trusted person in your life.';
    }
    
    // Default
    return 'I\'m here to listen. Tell me more.';
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
    </KeyboardAvoidingView>
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
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#F2F3F4',
    paddingTop: 20,  
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
