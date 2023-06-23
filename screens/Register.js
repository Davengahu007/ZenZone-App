import { View,Text } from 'react-native'
import React from 'react'
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import axios from 'axios';
import {BASE_URL} from '@env';
import {useState} from 'react'
import * as Device from 'expo-device'


export default function Register() {

    const [errorMessage,setError] = useState({email:"",password:""}),
    [successMessage, setSuccess] = useState("")


   const register = (email,password) => {
    const credentials = {
        email:email,
        password:password,
        devicename:Device.modelName
    }


      if(!email || !password){
      alert("Fill in all the required fields");
      }
      else{
        axios.post(`${'https://2088-105-160-50-65.ngrok-free.app'}/api/register`, credentials).then((response) =>{
            if(response.data.status){
                 setError({errorEmail: "",
                errorPassword: ""})
                setSuccess("Registration Successful")

            }
            else{
            console.log(response.data.messages)
            let errorEmailMsg = response.data.messages.email ? response.data.messages.email[0] : "",
            errorPassMsg = response.data.messages.password ? response.data.messages.password[0] : ""
            setError({errorEmail: errorEmailMsg,
            errorPassword:errorPassMsg})
            }
        }).catch((e) => console.log(e.message))
      }

   }



  return (
    <Layout>
        <View style = {tw`w-3/4`}>
        <Title text="Register" /> 
        {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}> {successMessage} </Text> }
        <Form signup={true} onSubmit={register} error={errorMessage}/>
        </View>
    </Layout>
  )
}
