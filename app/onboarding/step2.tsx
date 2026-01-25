import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const Step2 = () => {

    const Finish = async () => {
        await AsyncStorage.setItem('onboarding', 'true');
        router.replace('/Auth/Login');
    }
  return (
    <View style={styles.container}>
        <LinearGradient
         colors={['#A5D8FF', '#4BA3FF']}
         style={styles.background}
         start={{ x: 1, y: 1 }}
         end={{ x: 0, y: 0 }}
         />
        <View style={styles.container}>
            <Image 
            source={require("@/assets/images/rocket.png")}
            style={{ width: 100, height: 100, marginBottom: 20 }}
            />
       
            <Text style={styles.welcome2}>جاهز لتبدأ رحلتك؟</Text>
            <Text style={styles.welcome2}>إبدأ في تدوين ملاحظاتك ...</Text>
            
                
            <Button
            mode="contained"
            style={{marginTop: 100, borderRadius: 20, elevation: 10, width: 300}}
            buttonColor='#6A6AD2'
            textColor='#fff'
            onPress={Finish}
            >
                إبدأ الآن 
            </Button>
        </View>    
    </View>
    
  )
}

export default Step2

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcome2: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#2D2D2D',
    },
    background:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
})