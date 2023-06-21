import { View } from 'react-native'
import React from 'react'
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';


export default function Register() {

   const register = (email,password) => {
      if(!email && !password )
      alert("Fill in all the required fields")

      
   }


  return (
    <Layout>
        <View style = {tw`w-3/4`}>
        <Title text="Register" /> 
        <Form signup={true} onSubmit={register}/>
        </View>
    </Layout>
  )
}
