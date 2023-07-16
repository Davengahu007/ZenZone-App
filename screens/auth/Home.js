import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';
import Form from '../../components/Form';
import Title from '../../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import * as Device from 'expo-device';
import * as Animatable from 'react-native-animatable';
import FingerprintButton from '../../components/FingerprintButton';
import { Image } from 'react-native';
import logo from '../../assets/ZenZoneLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home(props) {
  const [errorMessage, setError] = useState({ email: '', password: '' });
  const [successMessage, setSuccess] = useState('');

  const handleFingerprintLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          login('JaneDoe@gmail.com', 'JaneDoe123()');
        }
      }
    }
  };

  const login = (email, password) => {
    const credentials = {
      email: email,
      password: password,
      devicename: Device.modelName,
    };

    if (!email || !password) {
      alert('Please fill in all required fields');
    } else {
      axios
        .post(`${'https://ad1f-105-163-158-200.ngrok-free.app'}/api/login`, credentials)
        .then(async (response) => {
          if (response.data.status) {
            await AsyncStorage.setItem('userToken', JSON.stringify(response.data));
            await AsyncStorage.setItem('userEmail', email);
            props.setToken(response.data);
            setError({ email: '', password: '' });
            setSuccess('Login Successful');
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'UserDashboard' }],
            });
          } else {
            console.log(response.data.messages);
            let errorEmailMsg = response.data.messages.email
              ? response.data.messages.email[0]
              : '';
            let errorPassMsg = response.data.messages.password
              ? response.data.messages.password[0]
              : '';
            setError({ email: errorEmailMsg, password: errorPassMsg });
          }
        })
        .catch((e) => {
          console.log(e.message);
          setError({ email: '', password: e.message });
        });
    }
  };

  return (
    <Layout>
      <Animatable.View animation="fadeIn" style={tw`w-3/4`}>
      <Image source={logo} style={{marginLeft:30, width: 250, height: 250}} resizeMode="stretch" />
        {successMessage !== '' && (
          <Text style={tw`p-1 my-2 text-green-700 rounded-lg`}>
            {successMessage}
          </Text>
        )}
        <Form signup={false} onSubmit={login} errorPassword={errorMessage.password} />
        <FingerprintButton onPress={handleFingerprintLogin} />
      </Animatable.View>
    </Layout>
  );
}
