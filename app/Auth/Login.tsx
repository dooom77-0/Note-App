import { StyleSheet, Text, View, Image } from 'react-native'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
  return (
    <View style={styles.container}>
        <Image
        source={require("@/assets/images/noteLogin.png")}
        style={{ width: 100, height: 100, marginBottom: 50 }}
         />
        
        <Text style={styles.title}>تسجيل الدخول</Text>
      
        <TextInput
        label="البريد الالكتروني"
        onChangeText={setEmail}
        value={email}
        placeholder='example@gmail.com'
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#333"
        theme={{ roundness: 12 }}
        style={styles.inputs}
        error={!!error}
        
        />
        
        <TextInput
        label="كلمة المرور"
        onChangeText={setPassword}
        value={password}
        mode="outlined"
        placeholder='أدخل كلمة المرور'
        secureTextEntry
        outlineColor="#E0E0E0"
        activeOutlineColor="#333"
        theme={{ roundness: 12 }}
        style={styles.inputs}
        error={!!error}
        />
        
        <Button
        mode="contained"
        style={{width: 300, borderRadius: 20, elevation: 10}}
        buttonColor='#6A6AD2'
        textColor='#fff'
        onPress={() => console.log('Login successful!')}
        >
            تسجيل الدخول
        </Button>
        
        <Text style={styles.New}>Create a new account ?</Text>
        
        <Text></Text>
    </View>
  )
}

export default Login;

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
      marginBottom: 20,
    },
    inputs: {
      width: 300,
      marginBottom: 20,
      borderRadius: 20,
      backgroundColor: '#EFEFEF'
    },
    New: {
      fontSize: 14,
      color: '#000',
        marginTop: 15
    }
})