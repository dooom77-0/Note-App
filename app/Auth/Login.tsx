import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const handleLogin = () => {
      if(email && password) {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Login successful!');
      }
      if(!email || !password) {
        setError('يرجى ملء جميع الحقول');
        return;
      }
      if(password.length < 6) {
        setError('كلمة المرور يجب ان تكون على الاقل 6 حروف');
        return;
      }
      router.replace('/(tabs)');
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <Image
          source={require("@/assets/images/noteLogin.png")}
          style={{ width: 100, height: 100, marginBottom: 30, marginTop:30 }}
          />
          <Text style={{textAlign: 'center', marginBottom: 20}}>تنبيه ! تسجيل الدخول ليس حقيقيا</Text>
          <Text style={styles.title}>تسجيل الدخول</Text>
        
          <TextInput
          label="البريد الالكتروني"
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
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
        
        {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
          
          <TouchableOpacity onPress={handleLogin} style={styles.login}>
            <Image
            source={require("@/assets/images/user.png")}
            style={{ width: 20, height: 20, marginRight: 10, tintColor: '#fff' }}
            />
            <Text style={styles.loginText}>تسجيل الدخول</Text>
          </TouchableOpacity>
          
          <Button
          mode="text"
          textColor='#000'
          onPress={() => router.replace('./Signup')}
          style={styles.New}>ليس لديك حساب؟</Button>
          
          <View style={styles.deviderContainer}>
            <View  style={styles.devider}/>
            <Text style={styles.or}>أو</Text>
            <View  style={styles.devider}/>
          </View>
          
        <TouchableOpacity
        style={styles.icons}
        >
          <Image
          source={require("@/assets/images/google.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text style={styles.iconText}>المتابعة بواسطة Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons}>
          <Image
          source={require("@/assets/images/facebook.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text style={styles.iconText}>المتابعة بواسطة Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons}>
          <Image
            source={require("@/assets/images/twitter.png")}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text style={styles.iconText}>المتابعة بواسطة Twitter/X</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A7C7FF',
      alignItems: 'center',
      justifyContent: 'center',
    paddingBottom: 20
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
    login:{
      flexDirection:'row',
      width: 300,
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      backgroundColor: '#3A7BD5',
      padding: 10
    },
    loginText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center'
    },
    New: {
      fontSize: 14,
      color: '#000',
      marginTop: 5
    },
  deviderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24
  },
  devider: {
    flex: 1,
    height: 2,
    backgroundColor: '#010101'
  },
  or: {
    marginHorizontal: 8,
    fontSize: 16
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    width: 300,
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10
  },
  iconText: {
    fontSize: 16,
    justifyContent: "center"
  }
})