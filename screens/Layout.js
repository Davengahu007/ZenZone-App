import { View , StyleSheet} from 'react-native'
import React from 'react'



export default function Layout({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });