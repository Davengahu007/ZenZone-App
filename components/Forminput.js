import { TextInput, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

export default function Forminput(props) {
  let{...other} = props
  return (
    <TextInput style={styles.container} {...other} />
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor:'#3182CE',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor:'#E5E8E8',
    borderRadius:15,
  },
})
