import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Form from '../../components/Form';
import Title from '../../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Animatable from 'react-native-animatable';

export default function Register() {
  const [errorMessage, setError] = useState('');
  const [successMessage, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigation();

  const register = (email, password) => {
    const credentials = {
      email: email,
      password: password,
      devicename: Device.modelName,
    };

    if (!email || !password) {
      alert('Fill in all the required fields');
    } else {
      axios
        .post(`${'https://cbc6-105-160-94-183.ngrok-free.app'}/api/register`, credentials)
        .then((response) => {
          if (response.data.status) {
            setError({ errorEmail: '', errorPassword: '' });
            setSuccess('Registration Successful');
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              navigation.navigate('Home');
            }, 1000);
          } else {
            console.log(response.data.messages);
            let errorEmailMsg = response.data.messages.email ? response.data.messages.email[0] : '';
            let errorPassMsg = response.data.messages.password ? response.data.messages.password[0] : '';
            setError({ errorEmail: errorEmailMsg, errorPassword: errorPassMsg });
          }
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Animatable.View animation="fadeIn" style={tw`w-3/4`}>
          <Title text="Register" />
          {!!successMessage && (
            <Modal visible={showPopup} animationType="fade" transparent={true}>
              <View style={styles.popupContainer}>
                <Text style={styles.popupText}>{successMessage}</Text>
              </View>
            </Modal>
          )}
          <Form
            signup={true}
            onSubmit={register}
            errorEmail={errorMessage.errorEmail}
            errorPassword={errorMessage.errorPassword}
          />
        </Animatable.View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgb(239 246 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  popupText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
