import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FingerprintButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.fingerprintButton} onPress={onPress}>
      <Ionicons name="finger-print-outline" size={24} color="#FFFFFF" />
      <Text style={styles.buttonText}>Use Fingerprint</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fingerprintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3182CE',
    padding: 15,
    borderRadius: 25,
    marginTop: 40,
    maxWidth:200,
    marginLeft:50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
