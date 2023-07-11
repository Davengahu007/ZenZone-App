import { View, Text } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../../components/FormInput';
import FormLabel from '../../components/FormLabel';
import FormButton from '../../components/FormButton';
import tw from 'tailwind-react-native-classnames';
import { BASE_URL } from '@env';
import Layout from './Layout';
import * as Animatable from 'react-native-animatable';

export default function PasswordResetPage() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setError] = useState("");
  const [successMessage, setSuccess] = useState("");

  const passwordreset = (email,password) => {
    const credentials = {
      email: email,
      password:password
    }

    if(!email || !password){
        alert("Fill in all the required fields");
        }
        else{
            axios.post(`${'https://cbc6-105-160-94-183.ngrok-free.app'}/api/passwordreset`, credentials).then((response) =>{
                if(response.data.status){
                     setError({errorEmail: "",
                    errorPassword: ""})
                    setSuccess("Password Change Successful")
    
                }
                else{
                console.log(response.data.messages)
                let errorEmailMsg = response.data.messages.email ? response.data.messages.email[0] : "",
                errorPassMsg = response.data.messages.password ? response.data.messages.password[0] : ""
                setError({errorEmail: errorEmailMsg,
                errorPassword:errorPassMsg})
                }
            }).catch((e) => console.log(e.message));
          }
  }
  

  const handlePasswordReset = () => {
    passwordreset(email);
    console.log('Password Reset Done');
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

     <FormLabel text="New Password" />
      <FormInput
        onChangeText={(text) => setPassword(text)}
        value={password}
      />


      <FormButton
        primary={true}
        // onPress={()=> {console.log("yessirr")}}
        onPress={handlePasswordReset}
        text="Submit"
      />

    </View>
  </Layout>
  )
}