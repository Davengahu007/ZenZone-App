import { TextInput } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import * as Animatable from 'react-native-animatable';

export default function Forminput(props) {
    let{...other} = props
  return (
    <TextInput style = {tw`border border-blue-400 rounded px-3 py-2`} {...other} />
  )
}
