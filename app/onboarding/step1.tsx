import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
const Step1 = () => {
    return (
      <View style={styles.container}>
        <LinearGradient
        colors={['#A5D8FF', '#4BA3FF']}
        style={styles.background}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
         />
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    background:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#2D2D2D',
    }
})