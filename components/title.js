import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title({ text }) {
  return (
    <Text style={styles.container}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    padding: 8,
    textAlign: 'center',
    color:'#F2F3F4',
    marginBottom:20,
    backgroundColor: '#3182CE',
    borderRadius: 25,
  },
});