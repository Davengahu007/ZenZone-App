import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import axios from 'axios';
import { BASE_URL } from '@env';
import * as Device from 'expo-device'

export default function Home() {
  const [errorMessage, setError] = useState({ email: '', password: '' });
  const [successMessage, setSuccess] = useState('');

  const login = (email, password) => {
    const credentials = {
      email: email,
      password: password,
      devicename:Device.modelName
    };

    if (!email || !password) {
      alert('Please fill in all required fields');
    } else {
      axios
        .post(`${BASE_URL}/api/login`, credentials)
        .then((response) => {
          if (response.data.status) {
            setError({ errorEmail: '', errorPassword: '' });
            setSuccess('Login Successful');
          } else {
            console.log(response.data.messages);
            let errorEmailMsg = response.data.messages.email
              ? response.data.messages.email[0]
              : '';
            let errorPassMsg = response.data.messages.password
              ? response.data.messages.password[0]
              : '';
            setError({ errorEmail: errorEmailMsg, errorPassword: errorPassMsg });
          }
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <Layout>
      <View style={tw`w-3/4`}>
        <Title text="Login" />
        {successMessage !== '' && (
          <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>
            {successMessage}
          </Text>
        )}
        <Form signup={false} onSubmit={login} />
      </View>
    </Layout>
  );
}
