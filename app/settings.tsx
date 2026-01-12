import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A7C7FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    }
})