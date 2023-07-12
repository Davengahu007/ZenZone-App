import { Text, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

export default function FormLabel({text}) {
  return (
    <Text style={styles.label}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
    color:'#3182CE',
    marginLeft:10,
    fontWeight:'bold'
  },
})
