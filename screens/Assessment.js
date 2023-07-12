import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Alert, Animated} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useState, useRef,useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Assessment() {

  const questions = [
   '1. How often have you felt amused, fun-loving, or silly?',
 	 '2. How often have you felt angry, irritated, or annoyed?',
	 '3. How often have you felt ashamed, humiliated, or disgraced?',
	 '4. How often have you felt awe, wonder, or amazement?',
 	 '5. How often have you felt contemptuous, scornful, or distainful?',
	 '6. How often have you felt disgust, distaste, or revulsion?',
	 '7. How often have you felt embarrassed, self-conscious, or blushing?',
	 '8. How often have you felt grateful, appreciative, or thankful?',
	 '9. How often have you felt guilty, repentant, or blameworthy?',
 	'10. How often have you felt hate, distrust, or suspicion?',
	'11. How often have you felt hopeful, optimistic, or encouraged?',
	'12. How often have you felt inspired, uplifted, or elevated?',
	'13. How often have you felt interested, alert, or curious?',
	'14. How often have you felt joyful, glad, or happy?',
	'15. How often have you felt love, closeness, or trust?',
	'16. How often have you felt proud, confident, or self-assured?',
	'17. How often have you felt sad, downhearted, or unhappy?',
 	'18. How often have you felt scared, fearful, or afraid?',
	'19. How often have you felt serene, content, or peaceful?',
	'20. How often have you felt stressed, nervous, or overwhelmed?',
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const refs = useRef(Array(questions.length).fill(React.createRef()));

  const titlePosition = useRef(new Animated.Value(1000)).current; 
  const beginAssessmentPosition = useRef(new Animated.Value(1000)).current; 
  const questionsPosition = useRef(new Animated.Value(1000)).current; 

  const handleSubmit = async () => {
  
    if (answers.includes('')) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const email = await AsyncStorage.getItem('userEmail');

    const data = answers.reduce((result, answer, index) => {
      result['q' + (index + 1)] = answer;
      return result;
    }, {});

    data['email'] = email;
    
    try {
      const response = await axios.post('https://8658-105-160-94-183.ngrok-free.app/api/analysis', data);

      console.log(response.data);
      Alert.alert('Success', 'Your answers have been submitted successfully.');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while submitting your answers.');
    }
  };

  const handleInputChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNextInputFocus = (index) => {
    if (index < questions.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  useFocusEffect(
    useCallback(() => {
  
      Animated.stagger(200, [ 
        Animated.spring(titlePosition, {
          toValue: 0,
          friction: 25.8, 
        tension: 5,
          duration: 500, 
          useNativeDriver: true, 
        }),
        Animated.spring(beginAssessmentPosition, {
          toValue: 0, 
          friction: 25.8, 
        tension: 5,
          duration: 500, 
          useNativeDriver: true, 
        }),
        Animated.spring(questionsPosition, {
          toValue: 0, 
          friction: 25.8, 
        tension: 5,
          duration: 500, 
          useNativeDriver: true, 
        }),
      ]).start();

    return () => {
      titlePosition.setValue(1000);
      beginAssessmentPosition.setValue(-1000);
      questionsPosition.setValue(1000);
    };
  }, [titlePosition, beginAssessmentPosition, questionsPosition])
  );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: titlePosition }],
          marginTop: 15,
          backgroundColor: '#2980B9',
          borderRadius: 20,
          marginHorizontal:5,
          padding: 10,
          paddingTop:20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4, 
          margin: 15, 
        }}
      >
        <Text style={styles.title}>Mental Health Check</Text>
        <Text style={styles.instructions}>
          Instructions:{'\n'}{'\n'}Please think back to how you have felt during the past 24 hours.{'\n'}{'\n'}
          Using the 0-4 scale below, indicate the greatest amount that you have experienced each of the following feelings.
        </Text>
        <Text style={styles.scale}>
        Not at all      =  0{'\n'}{'\n'}A little bit     =  1{'\n'}{'\n'}Moderately  =  2{'\n'}{'\n'}Quite a bit    =  3{'\n'}{'\n'}Extremely    =  4{'\n'}{'\n'}
        </Text>
      </Animated.View>
  
      <Animated.View
        style={{
          transform: [{ translateX: beginAssessmentPosition }],
          textAlign: 'center',
          marginBottom: 30,
          backgroundColor: '#F2F3F4',
          borderRadius: 20,
          maxWidth:300,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4, 
          marginLeft: 35,
          marginTop:15,
        }}
      >
        <Text style={styles.beginassessmenttitle}>Begin Assessment</Text>
        <Text style={styles.beginassessmentinstructions}>Respond to all 20 questions before submitting</Text>
      </Animated.View>
  
      <Animated.View
        style={{
          transform: [{ translateX: questionsPosition }],
        }}
      >
        {questions.map((question, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.question}>{question}</Text>
            <View style={{marginLeft:50,flexDirection: 'row', justifyContent: 'space-between',width: 250}}>
              <Text>0</Text>
              <Text>1</Text>
              <Text>2</Text>
              <Text>3</Text>
              <Text>4</Text>
            </View>
            <Slider
              style={{width: 270, height: 40,marginLeft:40}}
              minimumValue={0}
              maximumValue={4}
              step={1}
              value={answers[index]}
              onValueChange={(value) => handleInputChange(value, index)}
            />
          </View>
        ))}
      </Animated.View>
  
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#7FB3D5',
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#2980B9', 
    padding: 10,
    alignItems: 'center',
    maxWidth:200,
    marginLeft:85,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFF',
    textAlign: 'center', 
  },
  instructions: {
    marginBottom: 30,
    color: 'white',
    fontWeight:'bold',
    fontSize: 18,
  },

  beginassessment: {
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#F2F3F4',
    borderRadius: 20,
    maxWidth:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    marginLeft: 35,
    marginTop:15,
  },

  beginassessmenttitle:{
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    padding:6,
    marginHorizontal:25,
    marginTop:8
  },

  beginassessmentinstructions:{
   fontSize:16,
   color:'#808B96',
   padding:10,
   marginHorizontal:10,
  },

  scale: {
    fontSize:18,
    marginBottom: -10,
    color: '#FFF', 
    marginLeft:10,
    fontWeight:'bold',
  },
  inputContainer: {
    marginBottom: 20,
    marginLeft:5
  },
  question: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: '#2980B9',
    borderRadius: 20,
    marginHorizontal:5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    margin: 15,

  },
  input: {
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 5,
    borderColor: '#68A61C', 
    borderWidth: 1,
    color:'white',
  },
});
