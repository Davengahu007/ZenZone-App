import { View,Text } from 'react-native'
import React from 'react'
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';
import axios from 'axios';
import {BASE_URL} from '@env';
import {useState} from 'react'


export default function Register() {

    const [errorMessage,setError] = useState({email:"",password:""}),
    [successMessage, setSuccess] = useState("")



   

   const register = (email,password) => {
    const credentials = {
        email:email,
        password:password
    }

    
      if(!email || !password){
      alert("Fill in all the required fields");
      }
      else{
        axios.post(`${BASE_URL}/api/register`, credentials).then((response) =>{
            console.log(response.data)
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
