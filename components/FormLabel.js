import { Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function FormLabel({text}) {
  return (
  
      <Text style = {tw`text-lg p-1 font-semibold`}>{text}</Text>
    
  )
}