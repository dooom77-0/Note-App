import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const handleSignup = () => {
    if ( !email || !password || !confirmPassword) {
      setError('يرجى ملء جميع الحقول');
      return;
    } else if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    } else if (password.length < 6) {
      setError('كلمة المرور يجب ان تكون على الاقل 6 حروف');
    }
      
    else {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Signup successful!');
      router.replace('/(tabs)');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>إنشاء حساب </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            label='البريد الالكتروني'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            mode='outlined'
            theme={{roundness: 12}}
            placeholder='example@gmail.com'
            right={
              <TextInput.Icon
                icon='email'
              />
            }
            
          />
          <TextInput
            label='كلمة المرور'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword1}
            style={styles.input}
            mode='outlined'
            theme={{ roundness: 12 }}
            placeholder='password'
            right={
              <TextInput.Icon
                icon={showPassword1 ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword1(!showPassword1)}
              />
            }
          />
          <TextInput
            label='تاكيد كلمة المرور'
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword2}
            style={styles.input}
            mode='outlined'
            theme={{roundness: 12}}
            placeholder='password again'
            right={
              <TextInput.Icon
                icon={showPassword2 ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword2(!showPassword2)}
              />
            }
          />
          
        </View>
              
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        
        <TouchableOpacity style={styles.Signup} onPress={handleSignup}>
          <Image
            source={require("@/assets/images/signup.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
            tintColor={'white'}
          />
          <Text style={styles.SignupText}>إنشاء حساب</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/Auth/Login')} style={styles.backLogin}>
          <Text style={styles.backLoginText}>لديك حساب بالفعل ؟</Text>
        </TouchableOpacity>

        <View style={styles.OrContainer}>
          <View style={styles.OrLine}></View>
          <Text style={styles.OrText}>او</Text>
          <View style={styles.OrLine}></View>
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

export default Signup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A7C7FF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    paddingVertical: 20
      
    },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  input: {
    width: 300,
    backgroundColor: '#EFEFEF',
    textAlign: 'left',
  },
  old: {
      flexDirection:'row',
      width: 300,
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      backgroundColor: '#A7C7FF',
      padding: 5
  },
  Signup: {
      flexDirection:'row',
      width: 300,
      alignItems: 'center',
    borderRadius: 20,
      marginVertical: 10,
      justifyContent: 'center',
      backgroundColor: '#3A7BD5',
      padding: 5
  },
   SignupText: {
    fontSize: 16,
      color: '#fff',
     textAlign: 'center',
      padding: 5
  },
  backLogin: {
      width: 300,
      alignItems: 'center',
      borderRadius: 20,
      justifyContent: 'center',
      backgroundColor: '#A7C7FF',
      padding: 5
  },
  backLoginText: {
    fontSize: 16,
     textAlign: 'center',
      padding: 5
  },
  OrContainer: {
     flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  OrLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#333"
  },
  OrText: {
    marginHorizontal: 8,
    color: "#333",
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