// Add Notes screen 

import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import {useState, useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
const Add = () => {
  const titleRef = useRef<TextInput>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      titleRef.current?.focus()
    }, 100);
  }, [])
  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill all the fields')
      return
    }
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    }
    try {
      const stored = await AsyncStorage.getItem('notes')
      const parsed = stored ? JSON.parse(stored) : []
      const updatedNotes = [...parsed, newNote]
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" backgroundColor="#F3F3F3" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.SaveCon} onPress={handleSave}>
            <Ionicons name="save" size={20} color="#fff" />
            <Text style={styles.Save}>حفظ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BackCon} onPress={() => router.back()}>
            <Text style={styles.Back}>رجوع</Text>
            <Ionicons name="arrow-forward" size={20} color="#000"
              style={{paddingLeft: 5}}
             />
          </TouchableOpacity>
        </View>
        {/* END HEADER */}

        {/* START BODY  */}
        <View style={styles.Add}>
          <TextInput
            ref={titleRef}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={'gray'}
            placeholder="العنوان..."
            style={styles.inputTitle}
          />
          <View style={styles.line} />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholderTextColor={'gray'}
            placeholder="محتوى الملاحظة"
            multiline
            style={styles.inputContent}
          />
        </View>
      </SafeAreaView>
    
    )
  }

export default Add

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 22,
    backgroundColor: "#F3F3F3",
    elevation: 5,

  },
  SaveCon: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28A745",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold"
  },
  Save: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  BackCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "bold"
  },
  Back: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000"
  },
  Add: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F3F3"
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  inputContent: {
    fontSize: 16,
    marginBottom: 10,
  },
})