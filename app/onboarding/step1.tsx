import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const Step1 = () => {
    return (
      <View style={styles.container}>
      <View style={styles.container}>
        <Image 
        source={require("@/assets/images/Step1.png")}
        style={{ width: 100, height: 100, marginBottom: 20 }}
         />
         
        <Text style={styles.welcome}>كل فكرة تستحق أن تُكتب…</Text>
        <Text style={styles.welcome}>ابدأ بتدوين ملاحظاتك بطريقة بسيطة وجميلة.</Text>
        
        <Button
        mode="contained"
        style={{marginTop: 50, borderRadius: 20, elevation: 10, width: 300}}
        buttonColor='#6A6AD2'
        textColor='#fff'
        onPress={() => router.replace('./step2')}
        >
            التالي 
        </Button>
    </View>
      </View>
    
  )
}

export default Step1

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A7C7FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#2D2D2D',
    }
})