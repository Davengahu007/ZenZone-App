import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Its Working</Text>
      {/*<StatusBar style="auto" />*/}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });