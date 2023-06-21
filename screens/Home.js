import { View } from 'react-native'
import React from 'react'
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';


export default function Home() {
  const login = (email,password) =>{
    alert(email)
    // console.log(email)
  }
  return (
    <Layout>
        <View style = {tw`w-3/4`}>
        <Title text="Login" /> 
        <Form signup = {false} onSubmit={login} />
        </View>
    </Layout>
  );
}