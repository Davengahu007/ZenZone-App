import { View, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';
import DoubleTap from 'react-native-double-tap';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function HomeScreen() {
  const navigation = useNavigation();
  const today = new Date();
  const [isLiked, setLiked] = useState(false);
  const { colors } = useTheme();
  const Stack = createStackNavigator();


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
          <Text style={{fontWeight:'bold', marginTop:20,color: 'white', fontSize: 24 }}>ZenZone</Text>
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
      

      <View style={styles.blockContainer}>


        <Text style={styles.text}>Today I'm Feeling...</Text>
        

        <View style={{ marginTop:20,flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Happy' })}>
            <Text style={{fontSize: 40}}><Text>😀</Text></Text>
            <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Happy</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Sad' })}>
          <Text style={{fontSize: 40}}>😞
</Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Sad</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Meh' })}>
          <Text style={{fontSize: 40}}>😐</Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Meh</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Stressed' })}>
          <Text style={{fontSize: 40}}>😰</Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Stressed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Journals', { mood: 'Angry' })}>
          <Text style={{fontSize: 40}}>😡</Text>
          <Text style={{color:'white',fontSize: 12, textAlign: 'center'}}>Angry</Text>
        </TouchableOpacity>
        
      </View>
      
      </View>
      <View style={{ flexDirection: 'row' }}>
  <TouchableOpacity 
    style={{ flex: 0.5 }} 
    onPress={() => navigation.navigate('Journals')}
  >
    <View style={[styles.quoteContainer, styles.block]}>
      <Text style={styles.blockTextTitle}>Daily Log</Text>
      <Text style={styles.blockTextContent}>Keep record of how you are feeling?</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity 
    style={{ flex: 0.5 }} 
    onPress={() => navigation.navigate('Assessment')}
  >
    <View style={[styles.quoteContainer, styles.block]}>
      <Text style={styles.blockTextTitle}>Check-in</Text>
      <Text style={styles.blockTextContent}>Check your mental health status.</Text>
    </View>
  </TouchableOpacity>
</View>

      <View style={styles.todaysactivityContainer}>
    <Text style={styles.todaysactivityText}>Today's Activity:</Text>
    <Text style={styles.todaysactivity}>I will tell someone I appreciate them for being in my life!</Text>
  </View>

      <DoubleTap doubleTap={() => setLiked(!isLiked)}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>Quote of the Day</Text>
          <Text style={styles.quote}>“The best way to predict the future is to create it.” - Peter Drucker</Text>
          {isLiked && <Text style={styles.heartEmoji}>❤️</Text>}
        </View>
      </DoubleTap>
      
    </ScrollView>
  );
}

