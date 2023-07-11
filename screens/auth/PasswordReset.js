import { View, Text } from 'react-native'
import React, { useState } from 'react'
import FormInput from '../../components/FormInput'
import FormLabel from '../../components/FormLabel';
import FormButton from '../../components/FormButton';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';
import { BASE_URL } from '@env';
import Layout from './Layout';
import * as Animatable from 'react-native-animatable';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [errorMessage, setError] = useState("");
  const [successMessage, setSuccess] = useState("");

  const reset = (email) => {
    const credentials = {
      email: email,
    }

    if (!email) {
      alert("Fill in the required field");
    } else {
      axios.post(`${'https://1e78-2c0f-fe38-2329-1115-6c28-b363-590b-11b.ngrok-free.app '}/api/send-mail`, credentials)
        .then((response) => {
          if (response.data.status) {
            setError("");
            setSuccess("Email Sent Successfully");
          } else {
            console.log(response.data.messages);
            let errorEmailMsg = response.data.messages.email ? response.data.messages.email[0] : "";
            setError(errorEmailMsg);
          }
        })
        .catch((e) => console.log(e.message));
    }
  }

  const handleEmailSubmit = () => {
    reset(email);
    console.log('Email Submitted');
  };

  return (
    <Layout>
      <View>
        <Text style={tw`p-4`}>Kindly enter your email below to reset your password</Text>

        {!!successMessage && (
          <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>{successMessage}</Text>
        )}

        <FormLabel text="Email" />
        <FormInput
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <FormButton
          primary={true}
          onPress={handleEmailSubmit}
          text="Submit"
        />

      </View>
    </Layout>
  );
}
