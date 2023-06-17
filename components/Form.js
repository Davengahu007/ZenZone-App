import { View, Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import FormLabel from './FormLabel'
import FormInput from './FormInput'
import FormButton from './FormButton'

const FormInputGroup = ({children})=>{
    return(
        <View style = {tw`my-3`}>
            {children}
        </View>
    )
}

export default function Form(signup) {
    const [email,setEmail] = useState(""),
    [password,setPassword] = useState("")
  return (
    <View>

      <FormInputGroup>
        <FormLabel text="Email"/>
        <FormInput onChangeText={(text)=>setEmail(text)}
            value = {email}
        />
        
      </FormInputGroup>


      <FormInputGroup>
        <FormLabel text="Password"/>
        <FormInput onChangeText={(text)=>setPassword(text)}
            value = {password}
        />
      
      </FormInputGroup>


      <FormButton primary={true} text={!signup ? "Login" :"Register"}
      onPress={()=>alert({email})}/>

      <FormButton primary={false} text={signup ? "Login" :"Register" }/>

    </View>
  )
}