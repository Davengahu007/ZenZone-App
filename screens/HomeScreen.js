import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';
import DoubleTap from 'react-native-double-tap';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../assets/ZenZoneLogo.png';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const today = new Date();
  const [isLiked, setLiked] = useState(false);
  const { colors } = useTheme();
  const Stack = createStackNavigator();

  const quotePosition = useRef(new Animated.Value(-1000)).current; 
  const activityPosition = useRef(new Animated.Value(1000)).current; 
  const blockPosition = useRef(new Animated.Value(-1000)).current;

  const emojiAnimValue1 = useRef(new Animated.Value(0)).current;
  const emojiAnimValue2 = useRef(new Animated.Value(0)).current;
  const emojiAnimValue3 = useRef(new Animated.Value(0)).current;
  const emojiAnimValue4 = useRef(new Animated.Value(0)).current;
  const emojiAnimValue5 = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      quotePosition.setValue(-500);
      activityPosition.setValue(500);
      blockPosition.setValue(500);
  
      Animated.spring(quotePosition, {
        toValue: 0, 
        tension: 5, 
        friction: 25.8, 
        useNativeDriver: true,
      }).start();
  
      Animated.spring(activityPosition, {
        toValue: 0,
        tension: 5, 
        friction: 25.8,
        useNativeDriver: true,
      }).start();
  
      Animated.spring(blockPosition, {
        toValue: 0, 
        tension: 5, 
        friction: 25.8, 
        useNativeDriver: true,
      }).start();

      startFloatingAnimation();
    }, [])
  );

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(emojiAnimValue1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(emojiAnimValue1, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(emojiAnimValue2, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(emojiAnimValue2, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, 300);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(emojiAnimValue3, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(emojiAnimValue3, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, 800);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(emojiAnimValue4, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(emojiAnimValue4, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, 1200);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(emojiAnimValue5, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(emojiAnimValue5, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, 1600);
  };

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heartEmoji: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    fontSize: 22,
  },
  quoteContainer: {
    marginTop: 35,
    backgroundColor: '#F2F3F4',
    borderRadius: 20,
    marginHorizontal:20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    margin: 15, 
    marginBottom:10,
  },
  block: {
    flex: 1,
    margin: 5,
  },

  blockTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },

  blockTextContent: {
    fontSize: 14,
    color: '#808B96',
  },

  quoteText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#2C3E50',
  },

  quote: {
  fontSize: 16,
  color: '#808B96',
  },

  todaysactivityContainer:{
    marginTop: 15,
    backgroundColor: '#2980B9',
    borderRadius: 20,
    marginHorizontal:20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    margin: 0, 
  },

  todaysactivityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#F2F4F4',
  },


  todaysactivity: {
    fontSize: 16,
    color: '#CCD1D1',
    },
  
  blockContainer: {
    backgroundColor: 	'#2980B9',
    marginHorizontal: 10,
    marginTop:20,
    marginHorizontal:20,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  text: {
    color: '#F2F4F4' ,
    marginTop:10,
    marginBottom:0,
    fontSize: 35,
    marginLeft:10,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'sans-serif-condensed',
  },
  instructions: {
    color: 'white',
    fontSize: 14,
    fontWeight:'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
    // backgroundColor:'#68A61C',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 3,
    paddingHorizontal:10,
    borderRadius: 20,
    shadowColor: "#1F618D",
    shadowOffset: {
      width: 3,
      height: 2,
    },
  },

});
  
  return (
    <ScrollView>
    <View style={{ backgroundColor: '#7FB3D5', height: 70, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={logo} style={{marginTop:50, width: 150, height: 150}} resizeMode="stretch" />
            </View>
      <CalendarStrip
        scrollable
        style={{height:100, paddingTop: 20, paddingBottom: 10, backgroundColor:'#7FB3D5' }}
        calendarHeaderStyle={{color: '#1F618D'}}
        calendarColor={'white'}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        highlightDateNumberStyle={{color: '#1F618D'}}
        highlightDateNameStyle={{color: '#1F618D'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        iconContainer={{flex: 0.1}}

        selectedDate={today}
        onPressDate={(date) => {
        console.log(date);
      }}
        onPressGoToday={(today) => {
        console.log('today: ', today);
      }}
       onSwipeDown={() => {
      alert('onSwipeDown');
      }}
       markedDate={[today]}
      />
      
      <Animated.View style={[styles.blockContainer, { transform: [{ translateY: blockPosition }] }]}>
        <Text style={styles.text}>Today I'm Feeling...</Text>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Happy' })}>
          <Animated.Text style={{fontSize: 40, transform: [{ translateY: emojiAnimValue1.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }}>😀</Animated.Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Happy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Sad' })}>
          <Animated.Text style={{fontSize: 40, transform: [{ translateY: emojiAnimValue2.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }}>😞</Animated.Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Sad</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Meh' })}>
          <Animated.Text style={{fontSize: 40, transform: [{ translateY: emojiAnimValue3.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }}>😐</Animated.Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Meh</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Stressed' })}>
          <Animated.Text style={{fontSize: 40, transform: [{ translateY: emojiAnimValue4.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }}>😣</Animated.Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Stressed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Angry' })}>
          <Animated.Text style={{fontSize: 40, transform: [{ translateY: emojiAnimValue5.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }}>😡</Animated.Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Angry</Text>
        </TouchableOpacity>
      </View>
      
      </Animated.View>
      <View style={{ flexDirection: 'row' }}>
  <TouchableOpacity 
    style={{ flex: 0.5 }} 
    onPress={() => navigation.navigate('Journals')}
  >
    <Animated.View style={[styles.quoteContainer, styles.block,{transform: [{ translateX: quotePosition }] }]}>
      <Text style={styles.blockTextTitle}>Daily Log</Text>
      <Text style={styles.blockTextContent}>Keep record of how you are feeling?</Text>
    </Animated.View>

  </TouchableOpacity>

  <TouchableOpacity 
    style={{ flex: 0.5 }} 
    onPress={() => navigation.navigate('Assessment')}
  >
    <Animated.View style={[styles.quoteContainer, styles.block,{transform: [{ translateX: quotePosition }] }]}>
      <Text style={styles.blockTextTitle}>Check-in</Text>
      <Text style={styles.blockTextContent}>Check your mental health status.</Text>
    </Animated.View>
  </TouchableOpacity>
</View>

      <Animated.View style={[styles.todaysactivityContainer, { transform: [{ translateY: blockPosition }] }]}>
    <Text style={styles.todaysactivityText}>Today's Activity:</Text>
    <Text style={styles.todaysactivity}>I will tell someone I appreciate them for being in my life!</Text>
  </Animated.View>

      <DoubleTap doubleTap={() => setLiked(!isLiked)}>
      <Animated.View style={[styles.quoteContainer, styles.block,{transform: [{ translateX: quotePosition }] }]}>
          <Text style={styles.quoteText}>Quote of the Day</Text>
          <Text style={styles.quote}>“The best way to predict the future is to create it.” - Peter Drucker</Text>
          {isLiked && <Text style={styles.heartEmoji}>❤️</Text>}
        </Animated.View>
      </DoubleTap>
      
    </ScrollView>
  );
}

