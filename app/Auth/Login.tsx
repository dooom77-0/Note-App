import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
 
const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
    
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
      router.replace('/');
    }
  return (
    <View style={styles.container}>
      <LinearGradient 
      colors={['#A5D8FF', '#4BA3FF']}
      style={styles.background}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      />
        <Text style={styles.title}>تسجيل الدخول</Text>
        <Text style={styles.subtitle}>تسجيل دخول غير حقيقي </Text>
        <TextInput
          label="البريد الالكتروني"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          keyboardType="email-address"
          textContentType="emailAddress"
          error={!!error}
          activeOutlineColor='#000'
          theme={{roundness: 12}}
          style={styles.inputs}

          right={
            <TextInput.Icon
              icon="email"
            />
          }
        />
        <TextInput
          label="كلمة المرور"
          value={password}
          error={!!error}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          mode="outlined"
          activeOutlineColor='#000'
          style={styles.inputs}
          theme={{roundness: 12}}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          } 
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
          <View style={styles.iconsContainer}>
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
        
      </View>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 15,
      fontWeight: 'bold',
      color: 'yellow'
    },
    background:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  inputContainer: {
      alignItems: 'flex-start',
      marginBottom: 20,
  },
  inputs: {
    width: 300,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    textAlign: 'left', 
    marginBottom: 10,


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
  iconsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
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