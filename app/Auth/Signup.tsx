import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

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
        <Image
        source={require("@/assets/images/noteLogin.png")}
        style={{ width: 100, height: 100, marginBottom: 30, marginTop:30 }}
        />
        <Text style={styles.title}>إنشاء حساب </Text>
        <TextInput
        value={email}
        label="البريد الالكتروني"
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#333"
        placeholder='example@gmail.com'
        style={styles.inputs}
        theme={{roundness: 12}}
        onChangeText={setEmail}
        error={!!error}
        />
        <TextInput
        value={password}
        label="كلمة المرور"
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#333"
        placeholder='أدخل كلمة المرور'
        style={styles.inputs}
        secureTextEntry
        theme={{roundness: 12}}
        onChangeText={setPassword}
        error={!!error}
        />
        <TextInput
        value={confirmPassword}
        label="تاكيد كلمة المرور"
        mode="outlined"
        outlineColor="#E0E0E0"
        activeOutlineColor="#333"
        placeholder='أدخل كلمة المرور مرة أخرى'
        style={styles.inputs}
        secureTextEntry
        theme={{roundness: 12}}
        onChangeText={setConfirmPassword}
        error={!!error}
        />

        {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}

        <TouchableOpacity style={styles.Signup}>
          <Image
          source={require("@/assets/images/signup.png")}
          style={{ width: 30, height: 30 }}
          tintColor={'white'}
          />
          <Text style={styles.SignupText} onPress={handleSignup}>إنشاء الحساب </Text>
        </TouchableOpacity>

        <Button
          mode="text"
          labelStyle={{ color: '#000' }}
          style={styles.old}
          onPress={() => router.replace('./Login')}
        >
          لديك حساب بالفعل ؟
        </Button>

        <View style={styles.OrContainer}>
          <View style={styles.OrLine} />
          <Text style={styles.OrText}>أو</Text>
          <View style={styles.OrLine} />
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
      
    },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  inputs: {
      width: 300,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: '#EFEFEF',
      
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
  OrContainer: {
     flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
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