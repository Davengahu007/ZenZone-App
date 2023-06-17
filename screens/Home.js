import { View } from 'react-native'
import React from 'react'
import Form from '../components/Form';
import Title from '../components/Title';
import tw from 'tailwind-react-native-classnames';
import Layout from './Layout';


export default function Home() {
  return (
    <Layout>
        <View style = {tw`w-3/4`}>
        <Title text="Login" /> 
        <Form/>
        </View>
    </Layout>
  )
}

