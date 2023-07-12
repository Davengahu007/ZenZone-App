import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

export default function FormButton(props) {
  let { clickFunction, text, noBorder, primary, ...other } = props;

  const primaryStyling = {
    backgroundColor: '#3182CE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 32,
    borderRadius: 25,
  };
  const secondaryStyling = {
    borderWidth: noBorder ? 0 : 1,
    borderColor: '#3182CE',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 25,
  };
  const primaryText = {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  };
  const secondaryText = {
    textAlign: 'center',
    color: '#3182CE',
    fontWeight: 'bold',
    fontSize: 16,
  };

  return (
    <Animatable.View animation="bounceIn" duration={500}>
      <TouchableOpacity
        style={primary ? primaryStyling : secondaryStyling}
        {...other}
      >
        <Text style={primary ? primaryText : secondaryText}>{text}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
