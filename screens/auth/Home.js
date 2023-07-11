import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Form from '../../components/Form';
import Title from '../../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import axios from 'axios';
import { BASE_URL } from '@env';
import * as Device from 'expo-device';
import * as Animatable from 'react-native-animatable';

export default function Home(props) {
  const [errorMessage, setError] = useState({ email: '', password: '' });
  const [successMessage, setSuccess] = useState('');

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
        .post(`${'https://2d4b-105-161-227-23.ngrok-free.app'}/api/login`, credentials)
        .then((response) => {
          if (response.data.status) {
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
          setError({ email: '', password: e.message }); // Update the error state to show only password error
        });
    }
  };

  return (
    <Layout>
      <Animatable.View animation="fadeIn" style={tw`w-3/4`}>
        <Title text="Login" />
        {successMessage !== '' && (
          <Text style={tw`p-1 my-2 text-green-700 rounded-lg`}>
            {successMessage}
          </Text>
        )}
        <Form signup={false} onSubmit={login} errorPassword={errorMessage.password} />
      </Animatable.View>
    </Layout>
  );
}
